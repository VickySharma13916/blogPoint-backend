const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  studentName: String, // Name of the student
  studentImage: String, // Image URL for the student
  studentDescription: String, // Description of the student
});

module.exports = testimonialSchema;
