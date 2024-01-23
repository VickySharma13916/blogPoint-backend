const turacozTeam = require("../models/turacozTeam");

const postTuracozTeamImage = async (req, res) => {
  try {
    let teamImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        teamImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: teamImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postTuracozTeamData = async (req, res) => {
  const { teamName, teamDesignation, teamAbout, teamImage, teamCategory } =
    req.body;
  try {
    const newTuracozTeam = new turacozTeam({
      teamName: teamName,
      teamDesignation: teamDesignation,
      teamAbout: teamAbout,
      teamImage: teamImage,
      teamCategory: teamCategory?.value,
    });
    const savedTuracozTeam = await newTuracozTeam.save();
    res.status(200).json(savedTuracozTeam);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getTuracozTeam = async (req, res) => {
  try {
    const data = await turacozTeam.find().sort().exec();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTuracozTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await turacozTeam.findById(id);
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
    const { teamCategory } = req.body;
    let updates = req.body;
    updates.teamCategory = teamCategory?.value;
    const { id } = req.params;
    const updatedData = await turacozTeam.findByIdAndUpdate(id, updates, {
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
    const deletedData = await turacozTeam.findByIdAndRemove(id);
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
