const validator = require('validator');
const nodemailer = require('nodemailer');
const connectDB = require('../server/config/db');
const ContactMessage = require('../server/models/ContactMessage');

const sanitize = (value, max = 4000) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
};

const parseJsonBody = async (req) => {
  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) return null;

  let raw = '';
  for await (const chunk of req) {
    raw += chunk;
  }

  if (!raw) return {};

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

const getClientIp = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')?.[0]?.trim() ||
    req.socket?.remoteAddress ||
    null
  );
};

const createEmailTransporter = () => {
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 465),
    secure: process.env.EMAIL_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async ({ name, email, subject, service, message, ip }) => {
  const transporter = createEmailTransporter();
  if (!transporter) {
    throw new Error(
      'Email sending is not configured. Set EMAIL_HOST, EMAIL_USER and EMAIL_PASS.'
    );
  }

  const mailTo = process.env.EMAIL_TO || 'bilaltayyab121@gmail.com';
  await transporter.sendMail({
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
};

const validate = ({ name, email, subject, service, message }) => {
  const errors = {};

  if (!name || name.length < 2) errors.name = 'Name is required';
  if (!email) errors.email = 'Email is required';
  else if (!validator.isEmail(email)) errors.email = 'Email is invalid';
  if (!subject || subject.length < 2) errors.subject = 'Subject is required';
  if (!service) errors.service = 'Service is required';
  if (!message || message.length < 10)
    errors.message = 'Message must be at least 10 characters';

  return errors;
};

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
  }

  const body = req.body ?? (await parseJsonBody(req));
  if (body === null) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ success: false, message: 'Invalid JSON body' }));
  }

  const payload = {
    name: sanitize(body.name, 80),
    email: sanitize(body.email, 120).toLowerCase(),
    subject: sanitize(body.subject, 120),
    service: sanitize(body.service, 120),
    message: sanitize(body.message, 4000),
  };

  const errors = validate(payload);
  if (Object.keys(errors).length) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({
        success: false,
        message: 'Please fix the highlighted fields.',
        errors,
      })
    );
  }

  try {
    await connectDB();
    const contact = await ContactMessage.create({
      ...payload,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
    });

    await sendEmail({
      ...payload,
      ip: getClientIp(req),
    });

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        success: true,
        message: 'Thanks! Your message has been sent — I will get back to you soon.',
        data: {
          id: contact._id,
          createdAt: contact.createdAt,
        },
      })
    );
  } catch (error) {
    const message =
      error?.message || 'Something went wrong while sending your message.';
    res.statusCode = error.name === 'ValidationError' ? 400 : 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: false, message }));
  }
};
