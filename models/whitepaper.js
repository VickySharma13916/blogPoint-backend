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
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const whitepaperSchema = new mongoose.Schema({
  whitepaperTitle: {
    type: String,
    required: [true, "whitepaper Title is Required"],
  },
  whitepaperLink: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  authorLink: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  whitepaperDescription: {
    type: String,
    required: [true, "whitepaper Content is required"],
  },
  whitepaperAuthor: {
    type: String,
    required: [true, "Author is required"],
  },
  whitepaperImage: {
    type: String,
    required: [true, "whitepaper Image is required"],
  },
  whitepaperCategory: {
    type: [String],
    required: [true, "whitepaper Category is required"],
  },
  whitepaperTags: {
    type: String,
  },
  whitepaperFile: {
    type: String,
  },
  whitepaperSummary: {
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
  WhitepaperUserDetail: [userDetailSchema],
});
whitepaperSchema.index({ whitepaperTitle: "text" });
module.exports = mongoose.model("whitepaper", whitepaperSchema);
