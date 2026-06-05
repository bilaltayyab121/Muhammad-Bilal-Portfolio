const nodemailer = require('nodemailer');
const validator = require('validator');
const ContactMessage = require('../models/ContactMessage');

const emailTransporter = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 465),
      secure: process.env.EMAIL_SECURE !== 'false',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
  : null;

function sanitize(value, max = 4000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

const sendEmail = async ({ name, email, subject, service, message, ip, browserInfo, userAgent }) => {
  if (!emailTransporter) {
    console.error('Email transporter not configured');
    return;
  }

  const mailTo = process.env.EMAIL_TO || 'bilaltayyab121@gmail.com';
  
  const browserDetails = browserInfo ? 
    `Res: ${browserInfo.screenResolution}, Lang: ${browserInfo.language}, TZ: ${browserInfo.timezone}` : 
    'N/A';

  await emailTransporter.sendMail({
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: mailTo,
    subject: `[Portfolio Contact] ${subject}`,
    text: `New message from ${name} <${email}>
Service: ${service || 'N/A'}
IP: ${ip}
Browser: ${browserDetails}
User Agent: ${userAgent || 'N/A'}

${message}`,
    html: `<div style="font-family: sans-serif; line-height: 1.5; color: #333;">
             <h2 style="color: #2563eb;">New Portfolio Message</h2>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Service:</strong> ${service || 'N/A'}</p>
             <p><strong>IP Address:</strong> ${ip}</p>
             <p><strong>Browser Info:</strong> ${browserDetails}</p>
             <p><strong>User Agent:</strong> ${userAgent || 'N/A'}</p>
             <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
             <div style="background: #f9fafb; padding: 15px; border-radius: 8px;">
               ${message.replace(/\n/g, '<br/>')}
             </div>
           </div>`,
  });
};

async function createContactMessage(req, res, next) {
  try {
    const name = sanitize(req.body.name, 80);
    const email = sanitize(req.body.email, 120).toLowerCase();
    const subject = sanitize(req.body.subject, 120);
    const service = sanitize(req.body.service, 120);
    const message = sanitize(req.body.message, 4000);
    const browserInfo = req.body.browserInfo || null;
    const userAgent = req.get('user-agent') || null;
    const ip = req.ip;

    const errors = {};
    if (!name || name.length < 2) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    else if (!validator.isEmail(email)) errors.email = 'Email is invalid';
    if (!subject || subject.length < 2) errors.subject = 'Subject is required';
    if (!service) errors.service = 'Service is required';
    if (!message || message.length < 10)
      errors.message = 'Message must be at least 10 characters';

    if (Object.keys(errors).length) {
      return res.status(400).json({
        success: false,
        message: 'Please fix the highlighted fields.',
        errors,
      });
    }

    const doc = await ContactMessage.create({
      name,
      email,
      subject,
      service,
      message,
      ip,
      userAgent,
      browserInfo,
    });

    await sendEmail({ 
      name, 
      email, 
      subject, 
      service, 
      message, 
      ip, 
      browserInfo, 
      userAgent 
    });

    return res.status(201).json({
      success: true,
      message: 'Thanks! Your message has been sent — I will get back to you soon.',
      data: {
        id: doc._id,
        createdAt: doc.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createContactMessage };
