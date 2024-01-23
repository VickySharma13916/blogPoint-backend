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

const caseStudiesSchema = new mongoose.Schema({
  CaseStudiesTitle: {
    type: String,
    required: [true, "CaseStudies Title is Required"],
  },
  metaDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  CaseStudiesLink: {
    type: String,
  },
  authorLink: {
    type: String,
  },
  CaseStudiesDescription: {
    type: String,
    required: [true, "CaseStudies Content is required"],
  },
  CaseStudiesAuthor: {
    type: String,
    required: [true, "Author is required"],
  },
  CaseStudiesImage: {
    type: String,
    required: [true, "CaseStudies Image is required"],
  },
  CaseStudiesCategory: {
    type: [String],
    required: [true, "CaseStudies Category is required"],
  },
  CaseStudiesTags: {
    type: String,
  },
  CaseStudiesFile: {
    type: String,
  },
  CaseStudiesSummary: {
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
  CaseStudiesUserDetail: [userDetailSchema],
});
caseStudiesSchema.index({ CaseStudiesTitle: "text" });
module.exports = mongoose.model("CaseStudies", caseStudiesSchema);
