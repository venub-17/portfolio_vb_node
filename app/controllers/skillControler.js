const Skill = require("../models/skillmodel");
const { validationResult } = require("express-validator");

// Utility function to handle errors
const handleError = (res, error, message = "Internal Server Error") => {
  console.error(error); // Optional: log for debugging
  return res.status(500).json({
    message,
    error: error.message,
  });
};

// @desc Fetch all skills
const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().lean(); // .lean() returns plain JS objects - faster and lighter
    return res.status(200).json({ skills });
  } catch (error) {
    return handleError(res, error, "Failed to fetch skills");
  }
};

// @desc Add a new skill
const postSkill = async (req, res) => {
  try {
    // Validate request body (express-validator should be used in routes)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { skill_name, skill_link } = req.body;

    // Optional: Check if skill already exists
    const exists = await Skill.findOne({ skill_name });
    if (exists) {
      return res.status(409).json({ message: "Skill already exists" });
    }

    const newSkill = new Skill({ skill_name, skill_link });
    await newSkill.save();

    return res.status(201).json({
      message: "Skill saved successfully",
      skill: {
        id: newSkill._id,
        skill_name: newSkill.skill_name,
        skill_link: newSkill.skill_link,
      },
    });
  } catch (error) {
    return handleError(res, error, "Failed to save skill");
  }
};

module.exports = {
  getAllSkills,
  postSkill,
};
