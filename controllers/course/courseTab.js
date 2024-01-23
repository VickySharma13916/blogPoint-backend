const course = require("../../models/course/coursesTab");

const postCourseImage = async (req, res) => {
  try {
    let courseImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        courseImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: courseImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createCourse = async (req, res) => {
  const {
    courseName,
    courseImage,
    courseStartingDate,
    courseTimeLineImage,
    contactInformation,
    metaDescription,
    coursesType,
    coursesLink,
    metaTitle,
    authorLink,
    status,
  } = req.body;
  try {
    const newCourse = new course({
      courseName,
      coursesLink,
      courseImage,
      coursesType,
      contactInformation,
      courseTimeLineImage,
      courseStartingDate,
      metaDescription,
      metaTitle,
      authorLink,
      status,
    });
    const savedCourse = await newCourse.save();
    res.status(200).json(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await course.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await course.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await course
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Course List Fetched Successfully", docs: result });
    // const data = await blog.find();
    // res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await course.findOne({
      $or: [
        { coursesLink: titleCaseString },
        { coursesLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
      ],
    });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "Course Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    let updates = req.body;
    const { coursesLink } = req.body;
    const { id } = req.params;
    const updatedData = await course.updateOne(
      { coursesLink: id || coursesLink },
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
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await course.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  updateCourse,
  postCourseImage,
  createCourse,
  deleteCourse,
};
