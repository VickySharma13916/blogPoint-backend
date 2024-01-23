const mongoose = require("mongoose");

const ProposalRequestSchema = new mongoose.Schema({
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  company: {
    type: String,
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  message: {
    type: String,
  },
  phone: {
    type: String,
  },
  outsourcingTimeline: {
    type: String,
  },
  referalInterest: {
    type: String,
  },
  serviceInterest: {
    type: String,
  },
  state: {
    type: String,
  },
  therapyInterest: {
    type: String,
  },
  title: {
    type: String,
  },
  zip: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("contact", ProposalRequestSchema);
