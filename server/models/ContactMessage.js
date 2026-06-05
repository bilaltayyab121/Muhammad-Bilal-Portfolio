const mongoose = require('mongoose');
const validator = require('validator');

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name must be at most 80 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Please provide a valid email address",
      },
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      minlength: [2, "Subject must be at least 2 characters"],
      maxlength: [120, "Subject must be at most 120 characters"],
    },
    service: {
      type: String,
      trim: true,
      maxlength: [120, "Service must be at most 120 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [4000, "Message must be at most 4000 characters"],
    },
    ip: { type: String, default: null },
    userAgent: { type: String, default: null },
    browserInfo: {
      screenResolution: { type: String, default: null },
      language: { type: String, default: null },
      timezone: { type: String, default: null },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
