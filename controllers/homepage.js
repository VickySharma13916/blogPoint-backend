const homepage = require("../models/homepage");

const postImage = async (req, res) => {
  try {
    let bannerImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        bannerImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: bannerImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const { bannerName, bannerDescription, bannerTags, bannerImage } = req.body;
  const transformedBannerDescription = bannerDescription.map(
    (item) => item.description
  );
  try {
    const newHomepage = new homepage({
      bannerName: bannerName,
      bannerDescription: transformedBannerDescription,
      bannerImage: bannerImage,
      ...(bannerTags && { bannerTags }),
    });
    const savedHomepage = await newHomepage.save();
    res.status(200).json(savedHomepage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const gethomepage = async (req, res) => {
  try {
    const data = await homepage.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const gethomepageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await homepage.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHomepageById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const { bannerDescription, bannerTags } = req.body;
    const transformedBannerDescription = bannerDescription.map(
      (item) => item.description
    );
    let transformedBannerTags;
    if (bannerTags && bannerTags.length > 0) {
      transformedBannerTags = bannerTags;
    }
    updates.bannerDescription = transformedBannerDescription;
    updates.bannerTags = transformedBannerTags;
    const updatedData = await homepage.findByIdAndUpdate(id, updates, {
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

const deleteHomepageById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await homepage.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  gethomepage,
  gethomepageById,
  updateHomepageById,
  deleteHomepageById,
  postImage,
  postData,
};
