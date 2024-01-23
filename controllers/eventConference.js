const eventConference = require("../models/eventConference");

const postEventConferenceImage = async (req, res) => {
  try {
    let eventConferenceImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        eventConferenceImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: eventConferenceImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postEventConferenceData = async (req, res) => {
  const {
    metaDescription,
    metaTitle,
    eventConferenceLink,
    eventConferenceTitle,
    eventConferenceDescription,
    eventConferenceImage,
    eventConferenceTags,
    status,
  } = req.body;
  try {
    const neweventConference = new eventConference({
      metaDescription,
      metaTitle,
      eventConferenceLink,
      eventConferenceTitle,
      eventConferenceDescription,
      eventConferenceImage,
      eventConferenceTags,
      status,
    });
    const saveEventConference = await neweventConference.save();
    res.status(200).json(saveEventConference);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getEventConference = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await eventConference.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await eventConference.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await eventConference
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

const getEventConferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await eventConference.findOne({
      $or: [
        { eventConferenceLink: titleCaseString },
        {
          eventConferenceLink: {
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

const updateEventConferenceById = async (req, res) => {
  try {
    let updates = req.body;
    const { eventConferenceLink } = req.body;
    const { id } = req.params;
    const updatedData = await eventConference.updateOne(
      { eventConferenceLink: id || eventConferenceLink },
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
const deleteEventConferenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await eventConference.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Event Conference deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getEventConference,
  getEventConferenceById,
  postEventConferenceData,
  postEventConferenceImage,
  updateEventConferenceById,
  deleteEventConferenceById,
};
