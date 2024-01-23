const service = require("../models/services");

const postService = async (req, res) => {
  const { serviceName, serviceDescription, serviceLink } = req.body;
  try {
    const newService = new service({
      serviceName,
      serviceDescription,
      serviceLink,
    });
    const savedService = await newService.save();
    res.status(200).json(savedService);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getService = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await service.countDocuments().exec();
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
    result.data = await service
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Service List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "Service Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateServiceById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await service.findByIdAndUpdate(id, updates, {
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

const deleteServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await service.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getService,
  getServiceById,
  updateServiceById,
  postService,
  deleteServiceById,
};
