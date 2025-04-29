const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fileSize: { type: Number, required: true },
  contentType: { type: String, required: true },
});

const NewFile = mongoose.model("NewFile", fileSchema);

module.exports = NewFile;
