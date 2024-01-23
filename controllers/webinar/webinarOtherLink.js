const webinar = require("../../models/webinar/webinarTab");

const addWebinarOtherLinks = async (req, res) => {
  try {
    // Assuming your request body contains link data
    const accordionData = req.body;
    const coursetab = await webinar.findById(accordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    coursetab.WebinarOtherLinks.push(accordionData);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateWebinarOtherLinks = async (req, res) => {
  try {
    // Assuming your request body contains updated accordion data
    const updatedAccordionData = req.body;
    const coursetab = await webinar.findById(updatedAccordionData?.courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordion = coursetab.WebinarOtherLinks.id(
      updatedAccordionData?.accordionId
    );
    if (!accordion) {
      return res.status(404).json({ error: "Link section not found" });
    }

    // Update the link data
    accordion.set(updatedAccordionData);
    const updatedCourse = await coursetab.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteWebinarOtherLinks = async (req, res) => {
  try {
    const parts = req?.originalUrl?.split("/");
    const courseId = parts[3];
    const accordionId = parts[5];
    const coursetab = await webinar.findById(courseId);
    if (!coursetab) {
      return res.status(404).json({ error: "webinar not found" });
    }
    const accordionIndex = coursetab.WebinarOtherLinks.findIndex(
      (accordion) => accordion._id.toString() === accordionId
    );
    if (accordionIndex === -1) {
      return res.status(404).json({ error: "Accordion section not found" });
    }
    coursetab.WebinarOtherLinks.splice(accordionIndex, 1);
    const updatedCourse = await coursetab.save();
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addWebinarOtherLinks,
  updateWebinarOtherLinks,
  deleteWebinarOtherLinks,
};
