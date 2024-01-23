const workshop = require("../../models/workshop/workshopTab");

const createTrainerProfile = async (req, res) => {
  try {
    // Assuming your request body contains trainingprofile data
    const trainerProfileData = req.body;
    const workshopTab = await workshop.findById(trainerProfileData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    workshopTab.trainerProfiles.push(trainerProfileData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTrainerProfile = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordion = workshopTab.trainerProfiles.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    // Update the training data
    accordion.set(updatedAccordionData);
    const updatedCourse = await workshopTab.save();
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
    const workshopTab = await workshop.findById(courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordionIndex = workshopTab.trainerProfiles.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    workshopTab.trainerProfiles.splice(accordionIndex, 1);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTrainerProfile,
  updateTrainerProfile,
  deleteTrainerProfile,
};
