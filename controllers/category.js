const category = require("../models/category");

const postCategory = async (req, res) => {
  const { categoryName } = req.body;
  try {
    const newCategory = new category({
      categoryName: categoryName,
    });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getCategoryList = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await category.countDocuments().exec();
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
    result.data = await category
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Category List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatecategoryById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await category.findByIdAndUpdate(id, updates, {
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

const deletecategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await category.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Category Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategoryList,
  updatecategoryById,
  deletecategoryById,
  postCategory,
};
