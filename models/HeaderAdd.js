const mongoose = require("mongoose");

const HeaderAddSchema = mongoose.Schema({
  headerAddImage: {
    type: String,
  },
  headerAddLink: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("HeaderAdd", HeaderAddSchema);
