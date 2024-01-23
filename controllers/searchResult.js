const Blog = require("../models/blog");
const CaseStudy = require("../models/caseStudies");
const announcement = require("../models/announcement");
const eventConference = require("../models/eventConference");
const webinarConference = require("../models/webinarConference");
const Newsletter = require("../models/newsletter");
const Whitepaper = require("../models/whitepaper");
const Course = require("../models/course/coursesTab");
const Webinar = require("../models/webinar/webinarTab");
const Workshop = require("../models/workshop/workshopTab");
const Service = require("../models/services");

const getSearchResult = async (req, res) => {
  try {
    const searchQuery = req?.query?.search;

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required." });
    }

    // Search in each model and collect results
    const blogResults = await Blog.find({ $text: { $search: searchQuery } });
    const ServiceResults = await Service.find({
      $text: { $search: searchQuery },
    });
    const caseStudyResults = await CaseStudy.find({
      $text: { $search: searchQuery },
    });
    const newsletterResults = await Newsletter.find({
      $text: { $search: searchQuery },
    });
    const whitepaperResults = await Whitepaper.find({
      $text: { $search: searchQuery },
    });
    const courseResults = await Course.find({
      $text: { $search: searchQuery },
    });
    const webinarResults = await Webinar.find({
      $text: { $search: searchQuery },
    });
    const workshopResults = await Workshop.find({
      $text: { $search: searchQuery },
    });
    const announcementResult = await announcement.find({
      $text: { $search: searchQuery },
    });
    const eventConferenceResults = await eventConference.find({
      $text: { $search: searchQuery },
    });
    const webinarConferenceResults = await webinarConference.find({
      $text: { $search: searchQuery },
    });

    // Combine results from all models
    const combinedResults = {
      blogs: blogResults,
      caseStudies: caseStudyResults,
      newsletters: newsletterResults,
      whitepapers: whitepaperResults,
      courses: courseResults,
      webinars: webinarResults,
      workshops: workshopResults,
      announcements: announcementResult,
      eventConferences: eventConferenceResults,
      webinarConferences: webinarConferenceResults,
      service: ServiceResults,
    };

    res.status(200).json({ data: combinedResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getSearchResult,
};
