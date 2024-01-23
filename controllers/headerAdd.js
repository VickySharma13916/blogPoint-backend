const HeaderAdd = require("../models/HeaderAdd");

const postheaderAddImage = async (req, res) => {
  try {
    let headerAddImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        headerAddImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: headerAddImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postheaderAddData = async (req, res) => {
  const { headerAddLink, headerAddImage } = req.body;
  try {
    const newheaderAdd = new HeaderAdd({
      headerAddImage,
      headerAddLink,
    });

    const savedheaderAdd = await newheaderAdd.save();
    res.status(200).json(savedheaderAdd);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getheaderAddpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await HeaderAdd.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await HeaderAdd.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await HeaderAdd.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Header Add Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getheaderAddPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await HeaderAdd.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateheaderAddpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await HeaderAdd.findByIdAndUpdate(id, updates, {
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

const deleteHeaderAddById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await HeaderAdd.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getheaderAddpage,
  getheaderAddPageById,
  updateheaderAddpageById,
  postheaderAddImage,
  postheaderAddData,
  deleteHeaderAddById,
};
