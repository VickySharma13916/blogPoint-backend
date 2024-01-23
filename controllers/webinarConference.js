const webinarConference = require("../models/webinarConference");

const postwebinarConferenceImage = async (req, res) => {
  try {
    let webinarConferenceImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        webinarConferenceImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: webinarConferenceImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postWebinarConferenceData = async (req, res) => {
  const {
    metaDescription,
    metaTitle,
    webinarConferenceLink,
    webinarConferenceTitle,
    webinarConferenceDescription,
    webinarConferenceImage,
    webinarConferenceTags,
    status,
  } = req.body;
  try {
    const newwebinarConference = new webinarConference({
      metaDescription,
      metaTitle,
      webinarConferenceLink,
      webinarConferenceTitle,
      webinarConferenceDescription,
      webinarConferenceImage,
      webinarConferenceTags,
      status,
    });
    const savewebinarConference = await newwebinarConference.save();
    res.status(200).json(savewebinarConference);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getWebinarConference = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await webinarConference.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await webinarConference.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await webinarConference
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Event Conference Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWebinarConferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await webinarConference.findOne({
      $or: [
        { webinarConferenceLink: titleCaseString },
        {
          webinarConferenceLink: {
            $regex: new RegExp("^" + titleCaseString, "i"),
          },
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

const updateWebinarConferenceById = async (req, res) => {
  try {
    let updates = req.body;
    const { webinarConferenceLink } = req.body;
    const { id } = req.params;
    const updatedData = await webinarConference.updateOne(
      { webinarConferenceLink: id || webinarConferenceLink },
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
const deleteWebinarConferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await webinarConference.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Event Conference deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getWebinarConference,
  getWebinarConferenceById,
  postWebinarConferenceData,
  postwebinarConferenceImage,
  updateWebinarConferenceById,
  deleteWebinarConferenceById,
};
