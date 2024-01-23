const pressRelease = require("../models/pressRelease");

const postPressReleaseImage = async (req, res) => {
  try {
    let pressReleaseImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        pressReleaseImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: pressReleaseImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postPressReleaseData = async (req, res) => {
  const { status, pressReleaseName, pressReleaseImage, pressReleaseLink } =
    req.body;
  try {
    const newpressRelease = new pressRelease({
      status,
      pressReleaseName,
      pressReleaseImage,
      pressReleaseLink,
    });
    const savedpressRelease = await newpressRelease.save();
    res.status(200).json(savedpressRelease);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getPressReleasepage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await pressRelease.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await pressRelease.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await pressRelease
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Press Release Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPressReleaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pressRelease.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePressReleasepageById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await pressRelease.findByIdAndUpdate(id, updates, {
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

const deletePressReleaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await pressRelease.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Press Release deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPressReleaseById,
  getPressReleasepage,
  postPressReleaseData,
  postPressReleaseImage,
  deletePressReleaseById,
  updatePressReleasepageById,
};
