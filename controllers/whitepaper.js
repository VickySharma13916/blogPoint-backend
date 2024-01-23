const Whitepaper = require("../models/whitepaper");

const postwhitepaperImage = async (req, res) => {
  try {
    let whitepaperImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        whitepaperImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: whitepaperImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postwhitepaperData = async (req, res) => {
  const {
    whitepaperTitle,
    whitepaperDescription,
    whitepaperAuthor,
    whitepaperImage,
    whitepaperCategory,
    whitepaperTags,
    whitepaperSummary,
    metaDescription,
    whitepaperFile,
    whitepaperLink,
    metaTitle,
    status,
    authorLink,
  } = req.body;
  const transformedwhitepaperCategory = whitepaperCategory?.map(
    (item) => item.value
  );
  let transformedwhitepaperTags;
  if (whitepaperTags && whitepaperTags.length > 0) {
    transformedwhitepaperTags = whitepaperTags;
  }
  try {
    const newwhitepaper = new Whitepaper({
      whitepaperTitle,
      whitepaperDescription,
      whitepaperAuthor,
      whitepaperImage,
      whitepaperLink,
      whitepaperFile,
      whitepaperCategory: transformedwhitepaperCategory,
      whitepaperTags: transformedwhitepaperTags,
      metaDescription,
      metaTitle,
      whitepaperSummary,
      status,
      authorLink,
    });

    const savedwhitepaper = await newwhitepaper.save();
    res.status(200).json(savedwhitepaper);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postWhitepaperDataOfUser = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    const whitepaper = await Whitepaper.findById(req.params.id);
    if (!whitepaper) {
      return res.status(404).json({ error: "Whitepaper not found" });
    }
    const newUserDetail = {
      firstName,
      lastName,
      email,
      ...(message && { message }),
    };
    whitepaper.WhitepaperUserDetail.push(newUserDetail);
    const updatedWhitepaper = await whitepaper.save();
    res.status(200).json(updatedWhitepaper);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getwhitepaperpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await Whitepaper.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Whitepaper.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Whitepaper.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Whitepaper Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getwhitepaperPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await Whitepaper.findOne({
      $or: [
        { whitepaperLink: titleCaseString },
        { whitepaperLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
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

const updatewhitepaperpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { whitepaperCategory, whitepaperTags, whitepaperLink } = req.body;
    const transformedwhitepaperCategory = whitepaperCategory.map(
      (item) => item.value
    );
    let transformedwhitepaperTags;
    if (whitepaperTags && whitepaperTags.length > 0) {
      transformedwhitepaperTags = whitepaperTags;
    }
    const { id } = req.params;
    updates.whitepaperCategory = transformedwhitepaperCategory;
    updates.whitepaperTags = transformedwhitepaperTags;
    const updatedData = await Whitepaper.updateOne(
      { whitepaperLink: id || whitepaperLink },
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

const deleteWhitepaperById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Whitepaper.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Whitepaper deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWhitepaperUserData = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const carrerid = parts[3];
    const userId = parts[5];
    const carrerTab = await Whitepaper.findById(carrerid);
    if (!carrerTab) {
      return res.status(404).json({ error: "Whitepaper not found" });
    }
    const userDetailIndex = carrerTab.WhitepaperUserDetail.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userDetailIndex === -1) {
      return res.status(404).json({ error: "User Detail not found" });
    }
    carrerTab.WhitepaperUserDetail.splice(userDetailIndex, 1);
    const updatedCarrer = await carrerTab.save();
    res.status(200).json(updatedCarrer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getwhitepaperpage,
  getwhitepaperPageById,
  updatewhitepaperpageById,
  postwhitepaperImage,
  postwhitepaperData,
  postWhitepaperDataOfUser,
  deleteWhitepaperById,
  deleteWhitepaperUserData,
};
