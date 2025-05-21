const resumeDownloader = require("../models/resumeDownload");
const axios = require("axios");
const { emailService } = require("../shared/nodemailor");
require("dotenv").config();

const apiKey = process.env.ZB_API_KEY;
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
    // const zbResponse = await axios.get(
    //   `https://api.zerobounce.net/v2/validate`,
    //   {
    //     params: {
    //       api_key: apiKey,
    //       email: email,
    //     },
    //   }
    // );
    // if (zbResponse.data.status === "invalid") {
    //   res.status(400).json({
    //     message: "Invalid or undeliverable email.",
    //   });
    // } else {
    const message = `\n\nThank you for taking the time to download my resume. I hope my skills and experience align with what you're looking for. If you believe there's a potential fit, I’d be happy to discuss further.\n\nPlease feel free to reach me at beenaveni.venu@gmail.com.\n\nBest regards,\nVenu B.\nMobile:470-297-2720`;
    const subject = "Thank You for Downloading My Resume";
    emailService(name, email, subject, message);
    const newUser = await resumeDownloader({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      email,
      role,
    });
    await newUser.save();
    res.status(200).json({
      message: "User Saved Successfully",
    });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = { getResumeDownloaders, postResumeDownload };
