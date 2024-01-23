const workshop = require("../../models/workshop/workshopTab");

const addWorkshopOtherLinks = async (req, res) => {
  try {
    // Assuming your request body contains link data
    const accordionData = req.body;
    const workshopTab = await workshop.findById(accordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    workshopTab.workshopOtherLinks.push(accordionData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWorkshopOtherLinks = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    const accordion = workshopTab.workshopOtherLinks.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Link section not found" });
    }
    // Update the link data
    accordion.set(updatedAccordionData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWorkshopOtherLinks = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const workshopTab = await workshop.findById(courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "Workshop not found" });
    }
    const accordionIndex = workshopTab.workshopOtherLinks.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    workshopTab.workshopOtherLinks.splice(accordionIndex, 1);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addWorkshopOtherLinks,
  updateWorkshopOtherLinks,
  deleteWorkshopOtherLinks,
};
