const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, "Name is required"],
  },
  clientFeedback: {
    type: String,
    required: [true, "client Feedback is required"],
  },
  clientAddress: {
    type: String,
  },
  clientImage: {
    type: String,
    required: [true, "File is required"],
  },
});

module.exports = mongoose.model("client", clientSchema);
