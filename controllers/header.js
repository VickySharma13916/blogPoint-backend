const Header = require("../models/header");

const postheaderData = async (req, res) => {
  const { headerName, status } = req.body;
  try {
    const newheader = new Header({
      headerName,
      status,
    });
    const savedheader = await newheader.save();
    res.status(200).json(savedheader);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getheaderpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await Header.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Header.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Header.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Header Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getheaderPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Header.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateheaderpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await Header.findByIdAndUpdate(id, updates, {
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

const deleteHeaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Header.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Header deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getheaderpage,
  getheaderPageById,
  updateheaderpageById,
  postheaderData,
  deleteHeaderById,
};
