const inputCategory = require("../models/inputCategory");

const postinputCategory = async (req, res) => {
  const { type } = req.body;
  try {
    const newinputCategory = new inputCategory({
      type,
    });
    const savedinputCategory = await newinputCategory.save();
    res.status(200).json(savedinputCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getinputCategoryList = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await inputCategory.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < totalPosts) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await inputCategory
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Input Category List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateinputCategoryById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await inputCategory.findByIdAndUpdate(id, updates, {
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

const deleteinputCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await inputCategory.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Input Category Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getinputCategoryList,
  updateinputCategoryById,
  deleteinputCategoryById,
  postinputCategory,
};
