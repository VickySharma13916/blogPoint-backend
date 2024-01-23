const CourseTab = require("../../models/course/coursesTab");

const postTestimonialImage = async (req, res) => {
  try {
    let studentImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        studentImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: studentImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    // Assuming your request body contains testimonial data
    const trainerProfileData = req.body;
    const coursetab = await CourseTab.findById(trainerProfileData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    coursetab.testimonials.push(trainerProfileData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    // Assuming your request body contains updated testimonials data
    const updatedAccordionData = req.body;
    const coursetab = await CourseTab.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordion = coursetab.testimonials.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    // Update the training data
    accordion.set(updatedAccordionData);
    const updatedCourse = await coursetab.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await CourseTab.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordionIndex = coursetab.testimonials.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    coursetab.testimonials.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTestimonial,
  postTestimonialImage,
  updateTestimonial,
  deleteTestimonial,
};
