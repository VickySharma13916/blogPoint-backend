const announcement = require("../models/announcement");

const postAnnouncementImage = async (req, res) => {
  try {
    let AnnouncementImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        AnnouncementImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: AnnouncementImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postAnnouncementData = async (req, res) => {
  const {
    metaDescription,
    metaTitle,
    announcementLink,
    announcementTitle,
    announcementDescription,
    announcementImage,
    announcementTags,
    status,
  } = req.body;
  try {
    const newAnnouncement = new announcement({
      metaDescription,
      metaTitle,
      announcementLink,
      announcementTitle,
      announcementDescription,
      announcementImage,
      announcementTags,
      status,
    });
    const saveAnnouncement = await newAnnouncement.save();
    res.status(200).json(saveAnnouncement);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAnnouncement = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await announcement.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await announcement.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await announcement
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Announcement Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await announcement.findOne({
      $or: [
        { announcementLink: titleCaseString },
        {
          announcementLink: { $regex: new RegExp("^" + titleCaseString, "i") },
        },
      ],
    });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAnnouncementById = async (req, res) => {
  try {
    let updates = req.body;
    const { announcementLink } = req.body;
    const { id } = req.params;
    const updatedData = await announcement.updateOne(
      { announcementLink: id || announcementLink },
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
const deleteAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await announcement.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAnnouncement,
  getAnnouncementById,
  postAnnouncementData,
  postAnnouncementImage,
  updateAnnouncementById,
  deleteAnnouncementById,
};
