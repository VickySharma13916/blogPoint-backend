const CaseStudies = require("../models/caseStudies");

const postCaseStudiesImage = async (req, res) => {
  try {
    let CaseStudiesImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        CaseStudiesImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: CaseStudiesImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postCaseStudiesData = async (req, res) => {
  const {
    CaseStudiesTitle,
    CaseStudiesDescription,
    CaseStudiesAuthor,
    CaseStudiesLink,
    CaseStudiesFile,
    CaseStudiesImage,
    CaseStudiesCategory,
    CaseStudiesTags,
    CaseStudiesSummary,
    metaDescription,
    metaTitle,
    status,
    authorLink,
  } = req.body;
  const transformedCaseStudiesCategory = CaseStudiesCategory?.map(
    (item) => item.value
  );
  let transformedCaseStudiesTags;
  if (CaseStudiesTags && CaseStudiesTags.length > 0) {
    transformedCaseStudiesTags = CaseStudiesTags;
  }
  try {
    const newCaseStudies = new CaseStudies({
      CaseStudiesTitle,
      CaseStudiesDescription,
      CaseStudiesAuthor,
      CaseStudiesFile,
      metaDescription,
      metaTitle,
      CaseStudiesImage,
      CaseStudiesLink,
      CaseStudiesCategory: transformedCaseStudiesCategory,
      CaseStudiesTags: transformedCaseStudiesTags,
      CaseStudiesSummary,
      status,
      authorLink,
    });

    const savedCaseStudies = await newCaseStudies.save();
    res.status(200).json(savedCaseStudies);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postCaseStudiesDataOfUser = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    const caseStudy = await CaseStudies.findById(req.params.id);
    if (!caseStudy) {
      return res.status(404).json({ error: "CaseStudy not found" });
    }
    const newUserDetail = {
      firstName,
      lastName,
      email,
      ...(message && { message }),
    };
    caseStudy.CaseStudiesUserDetail.push(newUserDetail);
    const updatedCaseStudy = await caseStudy.save();
    res.status(200).json(updatedCaseStudy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCaseStudiespage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await CaseStudies.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await CaseStudies.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await CaseStudies.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Case Studies Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCaseStudiesPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await CaseStudies.findOne({
      $or: [
        { CaseStudiesLink: titleCaseString },
        { CaseStudiesLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
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

const updateCaseStudiespageById = async (req, res) => {
  try {
    let updates = req.body;
    const { CaseStudiesCategory, CaseStudiesTags, CaseStudiesLink } = req.body;
    const transformedCaseStudiesCategory = CaseStudiesCategory.map(
      (item) => item.value
    );
    let transformedCaseStudiesTags;
    if (CaseStudiesTags && CaseStudiesTags.length > 0) {
      transformedCaseStudiesTags = CaseStudiesTags;
    }
    const { id } = req.params;
    updates.CaseStudiesCategory = transformedCaseStudiesCategory;
    updates.CaseStudiesTags = transformedCaseStudiesTags;
    const updatedData = await CaseStudies.updateOne(
      { CaseStudiesLink: id || CaseStudiesLink },
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

const deleteCaseStudiesById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await CaseStudies.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "CaseStudies deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCaseStudyUserData = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const carrerid = parts[3];
    const userId = parts[5];
    const carrerTab = await CaseStudies.findById(carrerid);
    if (!carrerTab) {
      return res.status(404).json({ error: "CaseStudies not found" });
    }
    const userDetailIndex = carrerTab.CaseStudiesUserDetail.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userDetailIndex === -1) {
      return res.status(404).json({ error: "User Detail not found" });
    }
    carrerTab.CaseStudiesUserDetail.splice(userDetailIndex, 1);
    const updatedCarrer = await carrerTab.save();
    res.status(200).json(updatedCarrer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCaseStudiespage,
  getCaseStudiesPageById,
  updateCaseStudiespageById,
  postCaseStudiesImage,
  postCaseStudiesData,
  postCaseStudiesDataOfUser,
  deleteCaseStudiesById,
  deleteCaseStudyUserData,
};
