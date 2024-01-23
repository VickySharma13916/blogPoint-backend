const webinar = require("../../models/webinar/webinarTab");

const createJoinWebinarImageSlider = async (req, res) => {
  try {
    // Assuming your request body contains JoinWebinarImageSlider data
    const trainerProfileData = req.body;
    const coursetab = await webinar.findById(trainerProfileData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    coursetab.joinWebinarImageSlider.push(trainerProfileData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateJoinWebinarImageSlider = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const coursetab = await webinar.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    const accordion = coursetab.joinWebinarImageSlider.id(
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

const deleteJoinWebinarImageSlider = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await webinar.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    const accordionIndex = coursetab.joinWebinarImageSlider.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    coursetab.joinWebinarImageSlider.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createJoinWebinarImageSlider,
  updateJoinWebinarImageSlider,
  deleteJoinWebinarImageSlider,
};
