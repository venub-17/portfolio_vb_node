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
    const skill = await Skill.find();

    const newSkill = new Skill({
      skill_link: req.body.skill_link,
      skill_name: req.body.skill_name,
    });

    await newSkill.save();
    res.status(200).json({
      message: "Skill saved successfully",
    });
  } catch (error) {
    gError(res, error);
  }
};
// const updateSkill = () => {};
module.exports = { getAllSkills, postSkill };
