const Skill = require("../models/skillmodel");

const gError = (res, error) => {
  res.status(500).json({
    message: "Failed to save skill",
    error: error.message,
  });
};

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json({
      skills,
    });
  } catch (error) {
    gError(res, error);
  }
};

const postSkill = async (req, res) => {
  try {
    const skill = new Skill({
      skill_title: req.body.skill_title,
      newSkill: req.body.newSkill,
    });
    await skill.save();
    res.status(200).json({
      message: "Skill saved successfully",
      skill: skill,
    });
  } catch (error) {
    gError(res, error);
  }
};

module.exports = { getAllSkills, postSkill };
