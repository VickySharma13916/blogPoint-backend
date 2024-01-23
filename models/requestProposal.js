const mongoose = require("mongoose");

const ProposalRequestSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  company: {
    type: String,
  },
  country: {
    type: String,
  },
  RequirementDetail: {
    type: String,
  },
  RequirementHighlight: {
    type: String,
  },
  email: {
    type: String,
  },
  link: {
    type: String,
  },
  contactMode: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  proposalFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("ProposalRequest", ProposalRequestSchema);
