const imageSliderTuracoz = require("../models/imageSliderTuracoz");

const postImageSliderAboutImage = async (req, res) => {
  try {
    let imageSlider = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        imageSlider = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: imageSlider });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postImageSliderAboutData = async (req, res) => {
  const { turacozAboutImage, turacozImage } = req.body;
  try {
    const newImageSliderAbout = new imageSliderTuracoz({
      turacozImage: turacozImage,
      turacozAboutImage: turacozAboutImage,
    });
    const savedImageSliderAbout = await newImageSliderAbout.save();
    res.status(200).json(savedImageSliderAbout);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getImageSliderAbout = async (req, res) => {
  try {
    const data = await imageSliderTuracoz.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getImageSliderAboutById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await imageSliderTuracoz.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateImageSliderAboutById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await imageSliderTuracoz.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteImageSliderAboutMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await imageSliderTuracoz.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getImageSliderAbout,
  getImageSliderAboutById,
  updateImageSliderAboutById,
  deleteImageSliderAboutMember,
  postImageSliderAboutImage,
  postImageSliderAboutData,
};
