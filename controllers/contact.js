const contact = require("../models/contact");
const ContactEmailSend = require("./contactEmailSend");
const User = require("../models/user");

const postContactData = async (req, res) => {
  const {
    addressLine1,
    addressLine2,
    city,
    company,
    country,
    email,
    firstName,
    lastName,
    message,
    outsourcingTimeline,
    phone,
    referalInterest,
    serviceInterest,
    state,
    therapyInterest,
    title,
    zip,
  } = req.body;
  try {
    const newContact = new contact({
      addressLine1,
      addressLine2,
      city,
      company,
      country,
      email,
      firstName,
      lastName,
      message,
      outsourcingTimeline,
      phone,
      referalInterest,
      serviceInterest,
      state,
      therapyInterest,
      title,
      zip,
    });
    const savedContact = await newContact.save();
    // Find users with isProposalRequest set to true
    const usersWithProposalRequest = await User.find({
      isContact: true,
    });
    // Extract their emails into an array
    const emailsWithProposalRequest = usersWithProposalRequest.map(
      (user) => user.email
    );
    ContactEmailSend(savedContact, emailsWithProposalRequest);
    res.status(200).json(savedContact);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getContactpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 10
      : undefined;
    const result = {};
    const totalPosts = await contact.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await contact.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await contact
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Contact Form Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getContactPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await contact.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateContactById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await contact.findByIdAndUpdate(id, updates, {
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

const deleteContactById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await contact.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Contact Form Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postContactData,
  getContactPageById,
  updateContactById,
  deleteContactById,
  getContactpage,
};
