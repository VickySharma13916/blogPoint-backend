const userDetail = require("../models/userDetail");

const postUserDetailData = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
    const newUserDetail = new userDetail({
      firstName,
      lastName,
      email,
      ...(message && { message }),
    });
    const saveduserDetail = await newUserDetail.save();
    res.status(200).json(saveduserDetail);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getUserDetail = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 10
      : undefined;
    const result = {};
    const totalPosts = await userDetail.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await userDetail.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await userDetail
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Newsletter Subscription Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserdetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await userDetail.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res
      .status(200)
      .json({ message: "Newsletter Subscription deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postUserDetailData, getUserDetail, deleteUserdetailById };
