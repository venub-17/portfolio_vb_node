const express = require("express");
const router = express.Router();
const skillControler = require("../controllers/skillControler");
router.get("/get", skillControler.getAllSkills);

router.post("/post", skillControler.postSkill);

module.exports = router;
