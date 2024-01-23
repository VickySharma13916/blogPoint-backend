const mongoose = require("mongoose");

const courseOtherLinkSchema = new mongoose.Schema({
  CourseOtherName: String,
  CourseOtherLink: String,
});

module.exports = courseOtherLinkSchema;
