const mongoose = require("mongoose");
const webinarOtherLinkSchema = require("./webinarOtherLink");
const accordionSchema = require("../course/accordionSection");
const trainerProfileCardSchema = require("../course/trainerProfile");
const briefAboutSchema = require("../course/briefAbout");
const joinCourseImageSliderSchema = require("../course/courseJoinImage");
const testimonialSchema = require("../course/testimonial");

// Main schema for the webinar tab
const webinarTabSchema = new mongoose.Schema({
  webinarName: {
    type: String,
  },
  webinarImage: {
    type: String,
  },

  authorLink: {
    type: String,
  },
  WebinarOtherLinks: [webinarOtherLinkSchema],
  WebinarType: String,
  WebinarYoutubeLink: String,
  webinarTimeLineImage: String,
  webinarLink: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  briefAbout: [briefAboutSchema],
  accordionSections: [accordionSchema],
  trainerProfiles: [trainerProfileCardSchema],
  joinWebinarImageSlider: [joinCourseImageSliderSchema],
  testimonials: [testimonialSchema],
  webinarStartingDate: String,
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
webinarTabSchema.index({ webinarName: "text" });
module.exports = mongoose.model("webinarTab", webinarTabSchema);
