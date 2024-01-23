const mongoose = require("mongoose");
const workshopOtherLinkSchema = require("./workshopOtherLink");
const accordionSchema = require("../course/accordionSection");
const trainerProfileCardSchema = require("../course/trainerProfile");
const briefAboutSchema = require("../course/briefAbout");
const joinCourseImageSliderSchema = require("../course/courseJoinImage");
const testimonialSchema = require("../course/testimonial");

// Main schema for the workshop tab
const workshopTabSchema = new mongoose.Schema({
  workshopName: {
    type: String,
  },
  workshopImage: {
    type: String,
  },

  authorLink: {
    type: String,
  },
  workshopOtherLinks: [workshopOtherLinkSchema],
  workshopType: String,
  workshopTimeLineImage: String,
  workshopLink: {
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
  joinworkshopImageSlider: [joinCourseImageSliderSchema],
  testimonials: [testimonialSchema],
  workshopStartingDate: String,
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
workshopTabSchema.index({ workshopName: "text" });
module.exports = mongoose.model("workshopTab", workshopTabSchema);
