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

const newsletterSchema = new mongoose.Schema({
  NewsletterTitle: {
    type: String,
    required: [true, "Newsletter Title is Required"],
  },
  metaDescription: {
    type: String,
  },
  NewsletterLink: {
    type: String,
  },
  authorLink: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  NewsletterDescription: {
    type: String,
    required: [true, "Newsletter Content is required"],
  },
  NewsletterAuthor: {
    type: String,
    required: [true, "Author is required"],
  },
  NewsletterImage: {
    type: String,
    required: [true, "Newsletter Image is required"],
  },
  NewsletterCategory: {
    type: [String],
    required: [true, "Newsletter Category is required"],
  },
  NewsletterTags: {
    type: String,
  },
  NewsletterSummary: {
    type: String,
  },
  NewsletterFile: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  NewsletterUserDetail: [userDetailSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
newsletterSchema.index({ NewsletterTitle: "text" });
module.exports = mongoose.model("Newsletter", newsletterSchema);
