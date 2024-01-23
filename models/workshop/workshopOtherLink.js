const mongoose = require("mongoose");

const workshopOtherLinkSchema = new mongoose.Schema({
  workshopOtherName: String,
  workshopOtherLink: String,
});

module.exports = workshopOtherLinkSchema;
