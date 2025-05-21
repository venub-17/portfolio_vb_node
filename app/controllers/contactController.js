const contactSchema = require("../models/contactModel");
const { emailService } = require("../shared/nodemailor");
const axios = require("axios");
require("dotenv").config();

const apiKey = process.env.ZB_API_KEY;
const postContact = async (req, res) => {
  try {
    const { name, email, description } = req.body;
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
    const message = `\n\nThank you for taking the time to get in touch. I appreciate your interest and the opportunity you're considering.\n\nIf you've included a job description or project details, I’ll review them shortly and get back to you. I’m always open to exploring exciting roles.\nIn the meantime, feel free to reach me directly at beenaveni.venu@gmail.com.\n\nBest regards,\nVenu B.\nMobile:470-297-2720`;
    const subject = "Thank you for reaching out!";
    emailService(name, email, subject, message);
    const contactDetails = new contactSchema({
      name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
      email,
      description,
    });
    await contactDetails.save();
    res.status(200).json({
      message: "Thank you for reaching out!",
    });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = { postContact };
