const workshop = require("../../models/workshop/workshopTab");

const createTestimonial = async (req, res) => {
  try {
    // Assuming your request body contains testimonial data
    const trainerProfileData = req.body;
    const workshopTab = await workshop.findById(trainerProfileData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    workshopTab.testimonials.push(trainerProfileData);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    // Assuming your request body contains updated testimonials data
    const updatedAccordionData = req.body;
    const workshopTab = await workshop.findById(updatedAccordionData?.courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordion = workshopTab.testimonials.id(
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

const deleteTestimonial = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const workshopTab = await workshop.findById(courseId);
    if (!workshopTab) {
      return res.status(404).json({ error: "workshop not found" });
    }
    const accordionIndex = workshopTab.testimonials.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    workshopTab.testimonials.splice(accordionIndex, 1);
    const updatedCourse = await workshopTab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
