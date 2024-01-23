const requestProposal = require("../models/requestProposal");

const sendMail = require("./nodemailer");
const User = require("../models/user");
const postRequestFile = async (req, res) => {
  try {
    let RequestProposalFileUpload = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (
        mimetype.startsWith("application/pdf") ||
        mimetype.startsWith("application/msword") ||
        mimetype.startsWith(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) ||
        mimetype.startsWith("application/vnd.ms-powerpoint") ||
        mimetype.startsWith(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        mimetype.startsWith("image/")
      ) {
        RequestProposalFileUpload = req.file.destination + req.file.filename;
      } else {
        return res.status(400).json({
          error: "Only PDF, Word, PPT, and Image formats are supported",
        });
      }
    } else {
      return res.status(400).json({ error: "No file provided" });
    }
    res.status(200).json({ fileUrl: RequestProposalFileUpload });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postRequestProposalData = async (req, res) => {
  const {
    fullName,
    company,
    country,
    RequirementDetail,
    RequirementHighlight,
    email,
    link,
    contactMode,
    mobileNumber,
    proposalFile,
  } = req.body;
  try {
    const newRequestProposal = new requestProposal({
      fullName,
      company,
      country,
      RequirementDetail,
      RequirementHighlight,
      email,
      link,
      contactMode,
      mobileNumber,
      proposalFile,
    });
    const savedRequestProposal = await newRequestProposal.save();
    // Find users with isProposalRequest set to true
    const usersWithProposalRequest = await User.find({
      isProposalRequest: true,
    });
    // Extract their emails into an array
    const emailsWithProposalRequest = usersWithProposalRequest.map(
      (user) => user.email
    );
    sendMail(savedRequestProposal, emailsWithProposalRequest);
    res.status(200).json(savedRequestProposal);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getRequestProposalpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 10
      : undefined;
    const result = {};
    const totalPosts = await requestProposal.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await requestProposal.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await requestProposal
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "RequestProposal Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRequestProposalPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await requestProposal.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRequestProposalById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await requestProposal.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteRequestProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await requestProposal.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postRequestFile,
  postRequestProposalData,
  getRequestProposalPageById,
  updateRequestProposalById,
  deleteRequestProposalById,
  getRequestProposalpage,
};
