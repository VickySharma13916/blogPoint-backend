const workshop = require("../../models/workshop/workshopTab");

const addBriefAbout = async (req, res) => {
  try {
    // Assuming your request body contains briefAbout data
    const trainerProfileData = req.body;
    const workshopTab = await workshop.findById(trainerProfileData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    workshopTab.briefAbout.push(trainerProfileData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBriefAbout = async (req, res) => {
  try {
    // Assuming your request body contains updated testimonials data
    const updatedAccordionData = req.body;
    const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordion = workshopTab.briefAbout.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "briefAbout section not found" });
    }
    // Update the briefAbout data
    accordion.set(updatedAccordionData);
    const updatedCourse = await workshopTab.save();
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
    const workshopTab = await workshop.findById(courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordionIndex = workshopTab.briefAbout.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "briefAbout section not found" });
    }
    workshopTab.briefAbout.splice(accordionIndex, 1);
    const updatedCourse = await workshopTab.save();
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
