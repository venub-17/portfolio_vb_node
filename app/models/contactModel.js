const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ConstactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", ConstactSchema);
