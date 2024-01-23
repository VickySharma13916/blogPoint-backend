const mongoose = require("mongoose");

const turacozTeamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: [true, "Name is required"],
  },
  teamAbout: {
    type: String,
    required: [true, "Description is required"],
  },
  teamDesignation: {
    type: String,
    required: [true, "Designation is required"],
  },
  teamImage: {
    type: String,
    required: [true, "Image is required"],
  },
  teamCategory: {
    type: String,
    required: [true, "Team Member Category is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("turacozteam", turacozTeamSchema);
