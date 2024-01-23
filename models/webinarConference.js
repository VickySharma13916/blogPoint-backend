const mongoose = require("mongoose");

const webinarConferenceSchema = new mongoose.Schema({
  metaDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  webinarConferenceLink: {
    type: String,
  },
  webinarConferenceTitle: {
    type: String,
    required: [true, "Webinar Conference Title is Required"],
  },
  webinarConferenceDescription: {
    type: String,
    required: [true, "Webinar Conference Content is required"],
  },
  webinarConferenceImage: {
    type: String,
  },
  webinarConferenceTags: {
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
webinarConferenceSchema.index({ webinarConferenceTitle: "text" });
module.exports = mongoose.model("webinarConference", webinarConferenceSchema);
