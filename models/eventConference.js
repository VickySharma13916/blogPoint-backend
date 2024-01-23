const mongoose = require("mongoose");

const eventConferenceSchema = new mongoose.Schema({
  metaDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  eventConferenceLink: {
    type: String,
  },
  eventConferenceTitle: {
    type: String,
    required: [true, "Event Conference Title is Required"],
  },
  eventConferenceDescription: {
    type: String,
    required: [true, "Event Conference Content is required"],
  },
  eventConferenceImage: {
    type: String,
  },
  eventConferenceTags: {
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
eventConferenceSchema.index({ eventConferenceTitle: "text" });
module.exports = mongoose.model("eventConference", eventConferenceSchema);
