const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const skillController = require("../controllers/skillControler");

// @route   GET /skills/get
// @desc    Get all skills
router.get("/get", skillController.getAllSkills);

// @route   POST /skills/post
// @desc    Add a new skill
router.post(
  "/post",
  [
    body("skill_name").notEmpty().withMessage("Skill name is required"),
    body("skill_link").isURL().withMessage("Skill link must be a valid URL"),
  ],
  skillController.postSkill
);

module.exports = router;
