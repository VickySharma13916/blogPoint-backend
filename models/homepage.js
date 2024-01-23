const mongoose = require("mongoose");

const homepageSchema = new mongoose.Schema({
  bannerName: {
    type: String,
    required: [true, "Name is required"],
  },
  bannerDescription: {
    type: Object,
    required: [true, "Banner Description is required"],
  },
  bannerTags: {
    type: String,
  },
  bannerImage: {
    type: String,
    required: [true, "File is required"],
  },
});

module.exports = mongoose.model("homepage", homepageSchema);
