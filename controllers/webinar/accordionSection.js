const webinar = require("../../models/webinar/webinarTab");

const createAccordion = async (req, res) => {
  try {
    // Assuming your request body contains accordion data
    const accordionData = req.body;
    const webinarTab = await webinar.findById(accordionData?.courseId);
    if (!webinarTab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    webinarTab.accordionSections.push(accordionData);
    const updatedCourse = await webinarTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccordion = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const webinarTab = await webinar.findById(updatedAccordionData?.courseId);
    if (!webinarTab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    const accordion = webinarTab.accordionSections.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Accordion section not found" });
    }

    // Update the accordion data
    accordion.set(updatedAccordionData);
    const updatedCourse = await webinarTab.save();

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
    const webinarTab = await webinar.findById(courseId);
    if (!webinarTab) {
      return res.status(404).json({ error: "Webinar not found" });
    }
    const accordionIndex = webinarTab.accordionSections.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    webinarTab.accordionSections.splice(accordionIndex, 1);
    const updatedCourse = await webinarTab.save();
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
