const mongoose = require("mongoose");

const imageSliderTuracozSchema = new mongoose.Schema({
  turacozAboutImage: {
    type: String,
    required: [true, "About is required"],
  },
  turacozImage: {
    type: String,
    required: [true, "Image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("imageSliderTuracoz", imageSliderTuracozSchema);
