const mongoose = require("mongoose");
require("dotenv").config();
const mongoDB_URL = process.env.MONGODB_CONNECT_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
