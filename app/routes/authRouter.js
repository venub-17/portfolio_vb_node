const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControler");
const verifyToken = require("../middleware/authMiddleware");

router.post("/signup", authController.Signup);
router.post("/login", authController.Login);

module.exports = router;
