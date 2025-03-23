const mongoose = require("mongoose");

const oldFileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

const OldFile = mongoose.model("OldFile", oldFileSchema);

module.exports = OldFile;
