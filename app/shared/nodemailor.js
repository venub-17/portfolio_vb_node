const nodemailer = require("nodemailer");
require("dotenv").config();
const emailService = async (name, email, subject, message) => {
  const nameC = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });
  const mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: subject,
    text: `Hi ${nameC},${message}`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    if (error.responseCode === 550) {
    }
  }
};

module.exports = { emailService };
