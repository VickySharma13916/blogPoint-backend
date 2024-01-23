const fs = require("fs").promises;
const path = require("path");

const getMediaFiles = async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "../uploads");

    const files = await fs.readdir(uploadsPath);
    // Convert filenames to timestamps in milliseconds and sort in descending order
    const sortedFiles = files
      .map((file) => ({
        name: file,
        timestamp: parseInt(file.split(".")[0], 10) || 0, // Extract timestamp from filename
      }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((file) => `uploads/${file.name}`);

    const result = {
      totalDocs: files.length,
      data: sortedFiles,
    };

    return res
      .status(200)
      .json({ msg: "Media Files Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postMediaFile = async (req, res) => {
  try {
    let RequestProposalFileUpload = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (
        mimetype.startsWith("application/pdf") ||
        mimetype.startsWith("application/msword") ||
        mimetype.startsWith(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) ||
        mimetype.startsWith("application/vnd.ms-powerpoint") ||
        mimetype.startsWith(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        mimetype.startsWith("image/")
      ) {
        RequestProposalFileUpload = req.file.destination + req.file.filename;
      } else {
        return res.status(400).json({
          error: "Only PDF, Word, PPT, and Image formats are supported",
        });
      }
    } else {
      return res.status(400).json({ error: "No file provided" });
    }
    res.status(200).json({ fileUrl: RequestProposalFileUpload });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const deleteMediaFile = async (req, res) => {
  try {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, "../uploads", fileName); // Adjust the path
    // Check if the file exists
    const fileExists = await fs
      .access(filePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delete the file
    await fs.unlink(filePath);

    res.status(200).json({ msg: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getMediaFiles,
  postMediaFile,
  deleteMediaFile,
};
