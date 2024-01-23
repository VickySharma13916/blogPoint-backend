const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
  metaDescription: {
    type: String,
  },
  metaTitle: {
    type: String,
    required: [true, "Meta Title is required"],
  },
  announcementLink: {
    type: String,
  },
  announcementTitle: {
    type: String,
    required: [true, "Announcement Title is Required"],
  },
  announcementDescription: {
    type: String,
    required: [true, "Announcement Content is required"],
  },
  announcementImage: {
    type: String,
  },
  announcementTags: {
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
announcementSchema.index({ announcementTitle: "text" });
module.exports = mongoose.model("announcement", announcementSchema);
