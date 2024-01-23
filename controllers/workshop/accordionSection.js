const workshop = require("../../models/workshop/workshopTab");

const createAccordion = async (req, res) => {
  try {
    // Assuming your request body contains accordion data
    const accordionData = req.body;
    const workshopTab = await workshop.findById(accordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    workshopTab.accordionSections.push(accordionData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAccordion = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordion = workshopTab.accordionSections.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Accordion section not found" });
    }

    // Update the accordion data
    accordion.set(updatedAccordionData);
    const updatedCourse = await workshopTab.save();

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
    const workshopTab = await workshop.findById(courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordionIndex = workshopTab.accordionSections.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    workshopTab.accordionSections.splice(accordionIndex, 1);
    const updatedCourse = await workshopTab.save();
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
