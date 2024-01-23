const mongoose = require("mongoose");

const inputFieldItemSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  name: {
    type: String,
  },
  options: {
    type: [String], // Assuming options is an array of strings
    default: [],
  },
});

const inputFieldSchema = new mongoose.Schema({
  inputField: {
    type: [inputFieldItemSchema],
  },
  inputLink: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("inputField", inputFieldSchema);
