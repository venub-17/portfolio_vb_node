const mongoose = require("mongoose");
const NewFile = require("../models/resumeModel");
const OldFile = require("../models/oldResumeModel");
const connectDB = require("../../app/config/db");
const multer = require("multer");

// Initialize GridFSBucket
let gfsBucket;
connectDB();

mongoose.connection.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "new_files", // Name of the bucket
  });
});

// Multer memory storage to store files in memory before uploading
const storage = multer.memoryStorage();

// Upload new file
const uploadFile = async (req, res) => {
  try {
    console.log(req);
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate file size
    if (req.file.size > 2 * 1024 * 1024) {
      return res.status(400).json({ message: "File size exceeds 2MB limit" });
    }

    // Check if there's an existing file in the NewFile collection
    const existingFile = await NewFile.findOne().exec();

    if (existingFile) {
      // Move the existing file to the OldFile collection
      const oldFile = new OldFile({
        filename: existingFile.filename,
        fileId: existingFile.fileId,
        fileSize: existingFile.fileSize,
        contentType: existingFile.contentType,
      });

      await oldFile.save(); // Save to OldFile collection
      await NewFile.deleteOne({ _id: existingFile._id }); // Remove from NewFile collection
    }

    // Upload the new file to GridFS
    const uploadStream = gfsBucket.openUploadStream(req.file.originalname, {
      contentType: req.file.mimetype,
    });

    uploadStream.write(req.file.buffer);
    uploadStream.end();

    uploadStream.on("finish", async () => {
      // Save the new file metadata to the NewFile collection
      const newFile = new NewFile({
        filename: req.file.originalname,
        fileId: uploadStream.id,
        fileSize: req.file.size,
        contentType: req.file.mimetype,
      });

      await newFile.save();
      res.status(200).json({ message: "File uploaded successfully" });
    });

    uploadStream.on("error", (err) => {
      console.error("Error uploading file to GridFS:", err);
      res.status(500).json({ message: "Error uploading file" });
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get most recent file (for download)
const getRecentFile = async (req, res) => {
  try {
    const file = await NewFile.findOne().sort({ createdAt: -1 }).exec();
    if (!file) {
      return res.status(404).json({ message: "No recent file found" });
    }

    const downloadStream = gfsBucket.openDownloadStream(file.fileId);

    downloadStream.on("error", (err) => {
      console.error("Error reading file from GridFS:", err);
      return res.status(500).json({ message: "Error retrieving file" });
    });

    res.set("Content-Type", file.contentType || "application/octet-stream");
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Error retrieving recent file:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get list of old files
const getOldFiles = async (req, res) => {
  try {
    const files = await OldFile.find().exec();
    res.status(200).json(files);
  } catch (err) {
    console.error("Error retrieving old files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Move file from new to old collection
const moveToOld = async (req, res) => {
  const { fileId } = req.params;

  try {
    // Find the file in the NewFile collection
    const file = await NewFile.findOneAndDelete({ fileId: fileId });
    if (!file) {
      return res.status(404).json({ message: "File not found in new files" });
    }

    // Create a new entry in the OldFile collection
    const oldFile = new OldFile({
      filename: file.filename,
      fileId: file.fileId,
      fileSize: file.fileSize,
      contentType: file.contentType,
    });

    await oldFile.save();
    res.status(200).json({ message: "File moved to old files" });
  } catch (err) {
    console.error("Error moving file to old files:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete file from old files permanently
const deleteOldFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const oldFile = await OldFile.findOneAndDelete({ fileId: fileId });
    if (!oldFile) {
      return res.status(404).json({ message: "File not found in old files" });
    }

    // Delete from GridFS
    gfsBucket.delete(mongoose.Types.ObjectId(fileId), (err) => {
      if (err) {
        console.error("Error deleting file from GridFS:", err);
        return res
          .status(500)
          .json({ message: "Error deleting file from GridFS" });
      }

      res.status(200).json({ message: "File deleted permanently" });
    });
  } catch (err) {
    console.error("Error deleting file:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  uploadFile,
  getRecentFile,
  getOldFiles,
  moveToOld,
  deleteOldFile,
};
