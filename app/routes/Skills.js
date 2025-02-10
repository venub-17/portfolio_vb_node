const express = require("express");
const router = express.Router();
const skillControler = require("../controllers/skillControler");
router.get("/", skillControler.getAllSkills);

router.post("/", skillControler.postSkill);

module.exports = router;
