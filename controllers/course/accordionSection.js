const CourseTab = require("../../models/course/coursesTab");

const createAccordion = async (req, res) => {
  try {
    // Assuming your request body contains accordion data
    const accordionData = req.body;
    const coursetab = await CourseTab.findById(accordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    coursetab.accordionSections.push(accordionData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccordion = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const coursetab = await CourseTab.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordion = coursetab.accordionSections.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Accordion section not found" });
    }

    // Update the accordion data
    accordion.set(updatedAccordionData);
    const updatedCourse = await coursetab.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccordion = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await CourseTab.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Course not found" });
    }
    const accordionIndex = coursetab.accordionSections.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    coursetab.accordionSections.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateAccordion,
  createAccordion,
  deleteAccordion,
};
