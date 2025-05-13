const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resumeDownloadSchema = new Schema({
  role: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("ResumeDownloaders", resumeDownloadSchema);
