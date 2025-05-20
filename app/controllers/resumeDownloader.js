const { format } = require("morgan");
const resumeDownloader = require("../models/resumeDownload");
const nodemailer = require("nodemailer");
const axios = require("axios");

const ZB_API_KEY = "44a49cab4f234096b79afa427eaa2a1f";
const getResumeDownloaders = async (req, res) => {
  try {
    const users = await resumeDownloader.find();
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const postResumeDownload = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const zbResponse = await axios.get(
      `https://api.zerobounce.net/v2/validate`,
      {
        params: {
          api_key: ZB_API_KEY,
          email: email,
          ip_address: "", // optional
        },
      }
    );

    if (zbResponse.data.status === "invalid") {
      res.status(400).json({
        message: "Invalid or undeliverable email.",
      });
    } else {
      sendEmail(name, email);
      const newUser = await resumeDownloader({
        name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
        email,
        role,
      });
      await newUser.save();
      res.status(200).json({
        message: "User Saved Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const sendEmail = async (name, email) => {
  const nameC = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  console.log(nameC);

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "venuby95@gmail.com",
      pass: "ynaw znpe mqrx jqts",
    },
  });
  const mailOptions = {
    from: "venuby95@gmail.com",
    to: email,
    subject: "Thank You for Downloading My Resume",
    text: `Hi ${nameC},\n\nThank you for taking the time to download my resume. I hope my skills and experience align with what you're looking for. If you believe there's a potential fit, I’d be happy to discuss further.\n\nPlease feel free to reach me at beenaveni.venu@gmail.com.\n\nBest regards,\nVenu B.\nMobile:470-297-2720`,
  };
  try {
    const info = await transport.sendMail(mailOptions);
  } catch (error) {
    if (error.responseCode === 550) {
    }
  }
};

module.exports = { getResumeDownloaders, postResumeDownload };
