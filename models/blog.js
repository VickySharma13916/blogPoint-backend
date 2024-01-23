const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: [true, "Blog Title is Required"],
  },
  metaDescription: {
    type: String,
  },
  blogLink: {
    type: String,
  },
  metaTitle: {
    type: String,
    required: [true, "Meta Title is required"],
  },
  authorLink: {
    type: String,
  },
  blogDescription: {
    type: String,
    required: [true, "Blog Content is required"],
  },
  blogAuthor: {
    type: String,
    required: [true, "Author is required"],
  },
  blogImage: {
    type: String,
    required: [true, "Blog Image is required"],
  },
  blogCategory: {
    type: [String],
    required: [true, "Blog Category is required"],
  },
  blogTags: {
    type: String,
  },
  blogSummary: {
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
blogSchema.index({ blogTitle: "text" });
module.exports = mongoose.model("blog", blogSchema);
