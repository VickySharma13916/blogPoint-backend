const mongoose = require("mongoose");

const trainerProfileCardSchema = new mongoose.Schema({
  trainerName: String, // Name of the trainer
  trainerImage: String, // Image URL for the trainer
  trainerDesignation: String, // Description of the trainer
  trainerCompany: String, // Company name of the trainer
});
module.exports = trainerProfileCardSchema;
