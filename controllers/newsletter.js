const Newsletter = require("../models/newsletter");

const postNewsletterImage = async (req, res) => {
  try {
    let NewsletterImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        NewsletterImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: NewsletterImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postNewsletterData = async (req, res) => {
  const {
    NewsletterTitle,
    NewsletterDescription,
    NewsletterFile,
    NewsletterAuthor,
    NewsletterLink,
    NewsletterImage,
    NewsletterCategory,
    NewsletterTags,
    metaDescription,
    metaTitle,
    NewsletterSummary,
    status,
    authorLink,
  } = req.body;
  const transformedNewsletterCategory = NewsletterCategory?.map(
    (item) => item.value
  );
  let transformedNewsletterTags;
  if (NewsletterTags && NewsletterTags.length > 0) {
    transformedNewsletterTags = NewsletterTags;
  }
  try {
    const newNewsletter = new Newsletter({
      NewsletterTitle,
      NewsletterDescription,
      NewsletterAuthor,
      NewsletterImage,
      metaDescription,
      NewsletterFile,
      NewsletterLink,
      metaTitle,
      NewsletterCategory: transformedNewsletterCategory,
      NewsletterTags: transformedNewsletterTags,
      NewsletterSummary,
      status,
      authorLink,
    });

    const savedNewsletter = await newNewsletter.save();
    res.status(200).json(savedNewsletter);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getNewsletterpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await Newsletter.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await Newsletter.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await Newsletter.find()
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

const getNewsletterPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await Newsletter.findOne({
      $or: [
        { NewsletterLink: titleCaseString },
        { NewsletterLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
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

const updateNewsletterpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { NewsletterCategory, NewsletterTags, NewsletterLink } = req.body;
    const transformedNewsletterCategory = NewsletterCategory.map(
      (item) => item.value
    );
    let transformedNewsletterTags;
    if (NewsletterTags && NewsletterTags.length > 0) {
      transformedNewsletterTags = NewsletterTags;
    }
    const { id } = req.params;
    updates.NewsletterCategory = transformedNewsletterCategory;
    updates.NewsletterTags = transformedNewsletterTags;
    const updatedData = await Newsletter.updateOne(
      { NewsletterLink: id || NewsletterLink },
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

const deleteNewsletterById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Newsletter.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Newsletter deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postNewsLetterDataOfUser = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  try {
    const Newsletter = await Newsletter.findById(req.params.id);
    if (!Newsletter) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    const newUserDetail = {
      firstName,
      lastName,
      email,
      ...(message && { message }),
    };
    Newsletter.NewsletterUserDetail?.push(newUserDetail);
    const updatedNewsletter = await Newsletter.save();
    res.status(200).json(updatedNewsletter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteNewsletterUserData = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const carrerid = parts[3];
    const userId = parts[5];
    const carrerTab = await Newsletter.findById(carrerid);
    if (!carrerTab) {
      return res.status(404).json({ error: "Newsletter not found" });
    }
    const userDetailIndex = carrerTab.NewsletterUserDetail.findIndex(
      (user) => user._id.toString() === userId
    );
    if (userDetailIndex === -1) {
      return res.status(404).json({ error: "User Detail not found" });
    }
    carrerTab.NewsletterUserDetail.splice(userDetailIndex, 1);
    const updatedCarrer = await carrerTab.save();
    res.status(200).json(updatedCarrer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getNewsletterpage,
  getNewsletterPageById,
  updateNewsletterpageById,
  postNewsletterImage,
  postNewsletterData,
  deleteNewsletterById,
  postNewsLetterDataOfUser,
  deleteNewsletterUserData
};
