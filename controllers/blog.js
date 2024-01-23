const blog = require("../models/blog");

const postBlogImage = async (req, res) => {
  try {
    let blogImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        blogImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: blogImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const postBlogData = async (req, res) => {
  const {
    blogTitle,
    blogDescription,
    blogAuthor,
    blogImage,
    blogLink,
    blogCategory,
    blogTags,
    blogSummary,
    metaDescription,
    metaTitle,
    authorLink,
    status,
  } = req.body;
  const transformedBlogCategory = blogCategory?.map((item) => item.value);
  let transformedBlogTags;
  if (blogTags && blogTags.length > 0) {
    transformedBlogTags = blogTags;
  }
  try {
    const newBlog = new blog({
      blogTitle,
      blogDescription,
      blogAuthor,
      blogImage,
      blogLink,
      metaDescription,
      metaTitle,
      blogCategory: transformedBlogCategory,
      blogTags: transformedBlogTags,
      blogSummary,
      status,
      authorLink,
    });

    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getblogpage = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : req.query.pageNumber
      ? 6
      : undefined;
    const result = {};
    const totalPosts = await blog.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalDocs = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < totalPosts) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await blog
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.limit = limit;
    return res
      .status(200)
      .json({ msg: "Blog List Fetched Successfully", docs: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBlogPageById = async (req, res) => {
  try {
    const { id } = req.params;
    const decodedString = decodeURIComponent(id);
    const formattedString = decodedString.replace(/-/g, " ");
    const titleCaseString = formattedString.replace(/\b\w/g, (firstLetter) =>
      firstLetter.toUpperCase()
    );
    const data = await blog.findOne({
      $or: [
        { blogLink: titleCaseString },
        { blogLink: { $regex: new RegExp("^" + titleCaseString, "i") } },
      ],
    });
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ msg: "Blog Fetched Successfully", docs: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBlogpageById = async (req, res) => {
  try {
    let updates = req.body;
    const { blogCategory, blogTags, blogLink } = req.body;
    const transformedBlogCategory = blogCategory.map((item) => item.value);
    let transformedBlogTags;
    if (blogTags && blogTags.length > 0) {
      transformedBlogTags = blogTags;
    }
    const { id } = req.params;
    updates.blogCategory = transformedBlogCategory;
    updates.blogTags = transformedBlogTags;
    const updatedData = await blog.updateOne(
      { blogLink: id || blogLink },
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

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await blog.findByIdAndRemove(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Data not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getblogpage,
  getBlogPageById,
  updateBlogpageById,
  postBlogImage,
  postBlogData,
  deleteBlogById,
};
