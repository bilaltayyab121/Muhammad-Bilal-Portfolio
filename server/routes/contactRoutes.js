const express = require('express');
const rateLimit = require('express-rate-limit');
const { createContactMessage } = require('../controllers/contactController');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions from this IP. Please try again in a few minutes.',
  },
});

router.post('/', contactLimiter, createContactMessage);

module.exports = router;
