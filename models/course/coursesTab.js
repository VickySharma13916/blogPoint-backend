const mongoose = require("mongoose");
const courseOtherLinkSchema = require("./courseOtherLink");
const briefAboutSchema = require("./briefAbout");
const joinCourseImageSliderSchema = require("./courseJoinImage");
const accordionSchema = require("./accordionSection");
const trainerProfileCardSchema = require("./trainerProfile");
const testimonialSchema = require("./testimonial");

// Main schema for the course tab
const courseTabSchema = new mongoose.Schema({
  courseName: {
    type: String,
    // required: [true, "Name is required"],
  },
  courseImage: {
    type: String,
    // required: [true, "Image is required"],
  },
  coursesType: String,
  courseOtherLinks: [courseOtherLinkSchema],
  courseTimeLineImage: String,
  metaDescription: {
    type: String,
  },
  coursesLink: {
    type: String,
  },
  authorLink: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  briefAbout: [briefAboutSchema],
  accordionSections: [accordionSchema],
  joinCourseImageSlider: [joinCourseImageSliderSchema],
  trainerProfiles: [trainerProfileCardSchema],
  testimonials: [testimonialSchema],
  courseStartingDate: String,
  contactInformation: {
    name: String,
    phoneNumber: String,
    email: String,
    alternateEmail: String,
    designation: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
courseTabSchema.index({ courseName: "text" });
module.exports = mongoose.model("CourseTab", courseTabSchema);
