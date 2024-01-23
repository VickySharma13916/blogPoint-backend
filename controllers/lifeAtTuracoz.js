const lifeAtTuracoz = require("../models/lifeAtTuracoz");
const postTuracozTeamImage = async (req, res) => {
  try {
    let turacozteamImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        turacozteamImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: turacozteamImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postTuracozTeamData = async (req, res) => {
  const {
    turacozteamName,
    turacozteamDesignation,
    turacozteamAbout,
    turacozteamImage,
  } = req.body;
  try {
    const newTuracozturacozteam = new lifeAtTuracoz({
      turacozteamName: turacozteamName,
      turacozteamDesignation: turacozteamDesignation,
      turacozteamAbout: turacozteamAbout,
      turacozteamImage: turacozteamImage,
    });
    const savedTuracozTeam = await newTuracozturacozteam.save();
    res.status(200).json(savedTuracozTeam);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getTuracozTeam = async (req, res) => {
  try {
    const data = await lifeAtTuracoz.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTuracozTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await lifeAtTuracoz.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTuracozTeamById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await lifeAtTuracoz.findByIdAndUpdate(id, updates, {
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

const deleteTuracozTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await lifeAtTuracoz.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTuracozTeam,
  getTuracozTeamById,
  updateTuracozTeamById,
  deleteTuracozTeamMember,
  postTuracozTeamImage,
  postTuracozTeamData,
};
