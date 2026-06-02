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

async function sendEmail({ name, email, subject, service, message, ip }) {
  if (!emailTransporter) {
    throw new Error('Email sending is not configured on the server. Set EMAIL_HOST, EMAIL_USER and EMAIL_PASS.');
  }

  const mailTo = process.env.EMAIL_TO || 'bilaltayyab121@gmail.com';
  await emailTransporter.sendMail({
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: mailTo,
    subject: `[Portfolio Contact] ${subject}`,
    text: `New message from ${name} <${email}>\nService: ${service || 'N/A'}\nIP: ${ip}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Service:</strong> ${service || 'N/A'}</p>
           <p><strong>IP:</strong> ${ip}</p>
           <hr />
           <p>${message.replace(/\n/g, '<br/>')}</p>`,
  });
}

async function createContactMessage(req, res, next) {
  try {
    const name = sanitize(req.body.name, 80);
    const email = sanitize(req.body.email, 120).toLowerCase();
    const subject = sanitize(req.body.subject, 120);
    const service = sanitize(req.body.service, 120);
    const message = sanitize(req.body.message, 4000);

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
      ip: req.ip,
      userAgent: req.get('user-agent') || null,
    });

    await sendEmail({ name, email, subject, service, message, ip: req.ip });

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
