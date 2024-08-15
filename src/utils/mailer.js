const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "modistadonaluz@gmail.com",
    pass: "rans zuyo logv fqcr",
  }
});

module.exports = transporter;
