const Carrer = require("../models/carrer");

const postCarrerFile = async (req, res) => {
  try {
    let CarrerFileUpload = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("application/")) {
        CarrerFileUpload = req.file.destination + req.file.filename;
      } else {
        return res
          .status(400)
          .json({ error: "Only PDF and Word document formats are supported" });
      }
    }
    res.status(200).json({ fileUrl: CarrerFileUpload });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postCarrerData = async (req, res) => {
  const { carrerAccordionTitle, carrerAccordionDescription } = req.body;
  try {
    const newCarrer = new Carrer({
      carrerAccordionTitle,
      carrerAccordionDescription,
    });
    const savedCarrer = await newCarrer.save();
    res.status(200).json(savedCarrer);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postCarrerDataOfUser = async (req, res) => {
  try {
    const { firstName, lastName, email, carrerFile, message } = req.body;
    const caseStudy = await Carrer.findById(req.params.id);
    if (!caseStudy) {
      return res.status(404).json({ error: "Carrer not found" });
    }
    const newUserDetail = {
      firstName,
      lastName,
      email,
      carrerFile,
      ...(message && { message }),
    };
    caseStudy.carrerUserDetail.push(newUserDetail);
    const updatedCaseStudy = await caseStudy.save();
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteCarrerUserData = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const carrerid = parts[3];
    const userId = parts[5];
    const carrerTab = await Carrer.findById(carrerid);
    if (!carrerTab) {
      return res.status(404).json({ error: "Carrer not found" });
    }
    const userDetailIndex = carrerTab.carrerUserDetail.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userDetailIndex === -1) {
      return res.status(404).json({ error: "User Detail not found" });
    }
    carrerTab.carrerUserDetail.splice(userDetailIndex, 1);
    const updatedCarrer = await carrerTab.save();
    res.status(200).json(updatedCarrer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarrerpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await Carrer.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Carrer.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Carrer.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Carrer Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCarrerPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Carrer.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCarrerpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { id } = req.params;
    const updatedData = await Carrer.findByIdAndUpdate(id, updates, {
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

const deleteCarrerById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Carrer.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Carrer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCarrerpage,
  getCarrerPageById,
  updateCarrerpageById,
  postCarrerFile,
  postCarrerData,
  postCarrerDataOfUser,
  deleteCarrerById,
  deleteCarrerUserData,
};
