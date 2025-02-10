const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SkillSchema = new Schema({
  skill_title: {
    type: String,
    required: true,
  },
  newSkill: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Skill", SkillSchema);
