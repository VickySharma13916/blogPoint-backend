const mongoose = require("mongoose");

const webinarOtherLinkSchema = new mongoose.Schema({
  webinarOtherName: String,
  webinarOtherLink: String,
});

module.exports = webinarOtherLinkSchema;
