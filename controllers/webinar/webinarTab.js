const webinar = require("../../models/webinar/webinarTab");

const postWebinarImage = async (req, res) => {
  try {
    let WebinarImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        WebinarImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: WebinarImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createWebinar = async (req, res) => {
  const {
    webinarName,
    webinarImage,
    WebinarType,
    WebinarYoutubeLink,
    webinarStartingDate,
    webinarTimeLineImage,
    contactInformation,
    webinarLink,
    metaDescription,
    authorLink,
    metaTitle,
    status,
  } = req.body;
  try {
    const newWebinar = new webinar({
      webinarName,
      webinarImage,
      WebinarType,
      WebinarYoutubeLink,
      contactInformation,
      webinarTimeLineImage,
      webinarStartingDate,
      metaDescription,
      metaTitle,
      authorLink,
      webinarLink,
      status,
    });
    const savedWebinar = await newWebinar.save();
    res.status(200).json(savedWebinar);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllWebinars = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await webinar.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await webinar.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await webinar
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Webinar List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWebinarById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await webinar.findOne({
      $or: [
        { webinarLink: titleCaseString },
        { webinarLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
      ],
    });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "Webinar Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWebinar = async (req, res) => {
  try {
    let updates = req.body;
    const { webinarLink } = req.body;
    const { id } = req.params;
    const updatedData = await webinar.updateOne(
      { webinarLink: id || webinarLink },
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
const deleteWebinar = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await webinar.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWebinars,
  getWebinarById,
  updateWebinar,
  postWebinarImage,
  createWebinar,
  deleteWebinar,
};
