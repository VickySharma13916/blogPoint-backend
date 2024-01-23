const mongoose = require("mongoose");

const accordionSchema = new mongoose.Schema({
  AccordionTitle: String, // Name of the accordion section
  AccordionDescription: String, // Array of descriptions for the accordion
});
module.exports = accordionSchema;
