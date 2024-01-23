const CourseTab = require("../../models/course/coursesTab");

const postCourseTrainerImage = async (req, res) => {
  try {
    let trainerImage = "";
    if (req.file) {
      const { mimetype } = req.file;
      if (mimetype.startsWith("image/")) {
        trainerImage = req.file.destination + req.file.filename;
      }
    }
    res.status(200).json({ imageUrl: trainerImage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const createTrainerProfile = async (req, res) => {
  try {
    // Assuming your request body contains trainingprofile data
    const trainerProfileData = req.body;
    const coursetab = await CourseTab.findById(trainerProfileData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    coursetab.trainerProfiles.push(trainerProfileData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTrainerProfile = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const coursetab = await CourseTab.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordion = coursetab.trainerProfiles.id(
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

const deleteTrainerProfile = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await CourseTab.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordionIndex = coursetab.trainerProfiles.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    coursetab.trainerProfiles.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  postCourseTrainerImage,
  createTrainerProfile,
  updateTrainerProfile,
  deleteTrainerProfile,
};
