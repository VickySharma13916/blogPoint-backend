const mongoose = require("mongoose");

const inputCategorySchema = new mongoose.Schema({
  type: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("inputCategory", inputCategorySchema);
