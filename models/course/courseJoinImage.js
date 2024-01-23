const mongoose = require("mongoose");

const joinCourseImageSliderSchema = new mongoose.Schema({
  joinImage: String, // Image URL for the join course image slider
  joinDescription: String, // Description of the image
});

module.exports = joinCourseImageSliderSchema;
