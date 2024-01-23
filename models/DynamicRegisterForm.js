const mongoose = require("mongoose");

const DynamicRegisterFromSchema = mongoose.Schema({
  data: {
    type: Object,
  },
  Link: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  "DynamicRegisterForm",
  DynamicRegisterFromSchema
);
