const workshop = require("../../models/workshop/workshopTab");

const postWorkshopImage = async (req, res) => {
  try {
    let WorkshopImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        WorkshopImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: WorkshopImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createWorkshop = async (req, res) => {
  const {
    workshopImage,
    workshopType,
    workshopStartingDate,
    workshopTimeLineImage,
    workshopName,
    contactInformation,
    metaDescription,
    metaTitle,
    authorLink,
    workshopLink,
    status
  } = req.body;
  try {
    const newWorkshop = new workshop({
      workshopName,
      workshopImage,
      workshopType,
      contactInformation,
      workshopTimeLineImage,
      workshopStartingDate,
      metaDescription,
      metaTitle,
      authorLink,
      workshopLink,
      status
    });
    const savedWebinar = await newWorkshop.save();
    res.status(200).json(savedWebinar);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllWorkshop = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await workshop.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await workshop.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await workshop
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Workshop List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWorkshopById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await workshop.findOne({
      $or: [
        { workshopLink: titleCaseString },
        { workshopLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
      ],
    });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "Workshop Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWorkshop = async (req, res) => {
  try {
    let updates = req.body;
    const { workshopLink } = req.body;
    const { id } = req.params;
    const updatedData = await workshop.updateOne(
      { workshopLink: id || workshopLink },
      updates
    );
    if (!updatedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await workshop.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postWorkshopImage,
  createWorkshop,
  getAllWorkshop,
  getWorkshopById,
  updateWorkshop,
  deleteWorkshop,
};
