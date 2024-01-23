const user = require("../models/user");

const getUserDetail = async (req, res) => {
  const { email, name, type, status, sort, select } = req.query;
  const queryObject = {};
  let apiData = user.find(queryObject);

  if (email) {
    queryObject.email = email;
  }
  if (type) {
    queryObject.type = type;
  }
  if (status) {
    queryObject.status = status;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData.sort(sortFix);
  } else {
    // Sort by a timestamp field in descending order (assuming your field is named "createdAt").
    apiData.sort({ createdAt: -1 });
  }

  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData.select(selectFix);
  }

  let page = Number(req.query.page);
  let limit = Number(req.query.limit);
  let skip = (page - 1) * limit;
  const totalDocs = await user.countDocuments(queryObject);
  apiData = apiData.skip(skip).limit(limit);

  const users = await apiData;
  res.status(200).json({
    message: "User Data successfully",
    users,
    page: page,
    limit: limit,
    totalPage: Math.ceil(totalDocs / limit),
    totalDocs,
  });
};

const postUserData = async (req, res) => {
  const { name, email, mobileNumber, status, isProposalRequest, type } =
    req.body;
  try {
    const newUser = new user({
      name,
      email,
      mobileNumber,
      status,
      isProposalRequest,
      type,
    });
    const saveUser = await newUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await user.findByIdAndUpdate(id, updates, {
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

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await user.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserDetail,
  getUserById,
  deleteUserById,
  postUserData,
  updateUserById,
};
