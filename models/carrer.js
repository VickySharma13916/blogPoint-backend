const mongoose = require("mongoose");

const { Schema } = mongoose;
const userDetailSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  carrerFile: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const careerSchema = new mongoose.Schema({
  carrerAccordionTitle: {
    type: String,
    required: [true, "Carrer Title is Required"],
  },
  carrerAccordionDescription: {
    type: String,
    required: [true, "Carrer Description is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  carrerUserDetail: [userDetailSchema],
});

module.exports = mongoose.model("carrer", careerSchema);
