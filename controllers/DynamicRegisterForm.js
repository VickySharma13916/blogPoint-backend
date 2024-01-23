const DynamicRegisterForm = require("../models/DynamicRegisterForm");

const postDynamicRegisterFormData = async (req, res) => {
  const { Link, registerForm } = req.body;
  try {
    const newDynamicRegisterForm = new DynamicRegisterForm({
      data: registerForm,
      Link,
    });
    const savedDynamicRegisterForm = await newDynamicRegisterForm.save();
    res.status(200).json(savedDynamicRegisterForm);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getDynamicRegisterFormData = async (req, res) => {
  try {
    const data = await DynamicRegisterForm.find()
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDynamicRegisterFormDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DynamicRegisterForm.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDynamicRegisterFormDataById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await DynamicRegisterForm.findByIdAndUpdate(
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

const deleteDynamicRegisterFormDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await DynamicRegisterForm.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res
      .status(200)
      .json({ message: "Dynamic Register Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDynamicRegisterFormData,
  getDynamicRegisterFormDataById,
  updateDynamicRegisterFormDataById,
  deleteDynamicRegisterFormDataById,
  postDynamicRegisterFormData,
};
