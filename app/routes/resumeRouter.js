const express = require("express");
const router = express.Router();
const multer = require("multer");

const resumeControler = require("../controllers/resumeControler");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("file"); // 'file' is the field name

// Apply the multer middleware for file upload and then call the controller
router.post("/upload", upload, resumeControler.uploadFile);
router.get("/download", resumeControler.getRecentFile);

module.exports = router;
