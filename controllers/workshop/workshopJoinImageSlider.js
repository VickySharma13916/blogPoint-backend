const workshop = require("../../models/workshop/workshopTab");

const createJoinWorkshopImageSlider = async (req, res) => {
    try {
      // Assuming your request body contains JoinWorkshopImageSlider data
      const trainerProfileData = req.body;
      const workshopTab = await workshop.findById(trainerProfileData?.courseId);
      if (!workshopTab) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      workshopTab.joinworkshopImageSlider.push(trainerProfileData);
      const updatedCourse = await workshopTab.save();
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const updateJoinWorkshopImageSlider = async (req, res) => {
    try {
      // Assuming your request body contains updated accordion data
      const updatedAccordionData = req.body;
      const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
      if (!workshopTab) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      const accordion = workshopTab.joinworkshopImageSlider.id(
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
  
  const deleteJoinWorkshopImageSlider = async (req, res) => {
    try {
      const parts = req?.originalUrl?.split("/");
      const courseId = parts[3];
      const accordionId = parts[5];
      const workshopTab = await workshop.findById(courseId);
      if (!workshopTab) {
        return res.status(404).json({ error: "Workshop not found" });
      }
      const accordionIndex = workshopTab.joinworkshopImageSlider.findIndex(
        (accordion) => accordion._id.toString() === accordionId
      );
      if (accordionIndex === -1) {
        return res.status(404).json({ error: "Accordion section not found" });
      }
      workshopTab.joinworkshopImageSlider?.splice(accordionIndex, 1);
      const updatedCourse = await workshopTab.save();
      res.status(200).json(updatedCourse);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    createJoinWorkshopImageSlider,
    updateJoinWorkshopImageSlider,
    deleteJoinWorkshopImageSlider,
  };
  