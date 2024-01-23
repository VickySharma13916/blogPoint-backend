const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
  },
  serviceDescription: {
    type: String,
  },
  serviceLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
serviceSchema.index({ serviceName: "text" });
module.exports = mongoose.model("service", serviceSchema);
