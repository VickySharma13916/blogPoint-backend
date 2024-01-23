const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Name is required"],
  },
});

module.exports = mongoose.model("category", categorySchema);
