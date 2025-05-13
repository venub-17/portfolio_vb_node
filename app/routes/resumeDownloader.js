const express = require("express");
const router = express.Router();

const resumeDownloaderController = require("../controllers/resumeDownloader");

router.post("/post", resumeDownloaderController.postResumeDownload);

module.exports = router;
