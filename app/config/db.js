const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://venubeenaveni1734:aX51b45DhhGw5qMs@portfolio.dwdbp.mongodb.net/Portfolio_VB?retryWrites=true&w=majority&appName=Portfolio"
    );
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
