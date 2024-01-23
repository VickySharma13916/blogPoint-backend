const footer = require("../models/footer");

const postFooterData = async (req, res) => {
  const { footerDescription } = req.body;
  try {
    const newfooter = new footer({
      footerDescription,
    });
    const savedFooter = await newfooter.save();
    res.status(200).json(savedFooter);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getFooterData = async (req, res) => {
  try {
    const data = await footer.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFooterDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await footer.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFooterDataById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await footer.findByIdAndUpdate(id, updates, {
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

const deleteFooterDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await footer.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFooterData,
  getFooterDataById,
  updateFooterDataById,
  deleteFooterDataById,
  postFooterData,
};
