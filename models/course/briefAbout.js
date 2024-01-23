const mongoose = require("mongoose");

const briefAboutSchema = new mongoose.Schema({
  AboutTitle: String, // Title of the brief about section
  AboutImage: String, // Image URL for the brief about section
  AboutDescription: String, // Description of the brief about section
});

module.exports = briefAboutSchema;
