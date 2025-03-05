const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});
userSchema.pre("save", (next) => {
  const adminEmail = "venuby95@gmail.com";
  this.role = this.email === adminEmail ? "admin" : "user";
  next();
});
module.exports = mongoose.model("User", userSchema);
