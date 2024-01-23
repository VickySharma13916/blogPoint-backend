const mongoose = require("mongoose");

const seoDataSchema = new mongoose.Schema({
  metaDescription: {
    type: String,
    
  },
  metaTitle: {
    type: String,
    
  },
  name: {
    type: String,
  },
  metaImage: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("seodata", seoDataSchema);
