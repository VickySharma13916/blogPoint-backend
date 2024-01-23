const InputField = require("../models/inputField");

const postInputFieldData = async (req, res) => {
  const { inputField, inputLink, status } = req.body;
  try {
    const newInputField = new InputField({
      inputField,
      inputLink,
      status,
    });
    const savedInputField = await newInputField.save();
    res.status(200).json(savedInputField);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getInputField = async (req, res) => {
  try {
    const data = await InputField.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInputFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await InputField.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateInputFieldById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await InputField.findByIdAndUpdate(id, req.body, {
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

const deleteInputFieldMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await InputField.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getInputField,
  getInputFieldById,
  updateInputFieldById,
  deleteInputFieldMember,
  postInputFieldData,
};
