const mongoose = require("mongoose");

const FooterSchema = mongoose.Schema({
  footerDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("footer", FooterSchema);
