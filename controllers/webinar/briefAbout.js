const webinar = require("../../models/webinar/webinarTab");

const addBriefAbout = async (req, res) => {
  try {
    // Assuming your request body contains briefAbout data
    const trainerProfileData = req.body;
    const coursetab = await webinar.findById(trainerProfileData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    coursetab.briefAbout.push(trainerProfileData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBriefAbout = async (req, res) => {
  try {
    // Assuming your request body contains updated testimonials data
    const updatedAccordionData = req.body;
    const coursetab = await webinar.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordion = coursetab.briefAbout.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "briefAbout section not found" });
    }
    // Update the briefAbout data
    accordion.set(updatedAccordionData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBriefAbout = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await webinar.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordionIndex = coursetab.briefAbout.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "briefAbout section not found" });
    }
    coursetab.briefAbout.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addBriefAbout,
  updateBriefAbout,
  deleteBriefAbout,
};
