const express = require("express");
const router = express.Router();

const resumeDownloaderController = require("../controllers/resumeDownloader");

router.post("/post", resumeDownloaderController.postResumeDownload);
router.get("/get", resumeDownloaderController.getResumeDownloaders);

module.exports = router;
