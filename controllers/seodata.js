const seodata = require("../models/seodata");

const postSeoImage = async (req, res) => {
  try {
    let metaImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        metaImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: metaImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postSeoData = async (req, res) => {
  const { metaDescription, metaTitle, name, metaKeywords, metaImage } =
    req.body;
  try {
    const newSeoData = new seodata({
      metaDescription,
      metaTitle,
      metaKeywords,
      metaImage,
      name,
    });
    const savedSeoData = await newSeoData.save();
    res.status(200).json(savedSeoData);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getSeoData = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await seodata.countDocuments().exec();
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
    result.data = await seodata
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "SEO Data List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSeoDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await seodata.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "SEO Data Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSeoDataById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await seodata.findByIdAndUpdate(id, updates, {
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

module.exports = {
  getSeoData,
  getSeoDataById,
  updateSeoDataById,
  postSeoData,
  postSeoImage,
};
