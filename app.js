const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(cors());

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));
const port = process.env.PORT || 5001;
const connectDB = require("./db/connect");
const blog_routes = require("./routes/blog");
const caseStudies_routes = require("./routes/caseStudies");
const users_routes = require("./routes/user");
const client_routes = require("./routes/client");
const newsletter_routes = require("./routes/newsletter");
const homepage_routes = require("./routes/homepage");
const userDetail_routes = require("./routes/userDetail");
const whitepaper_routes = require("./routes/whitepaper");
const turacozTeam_routes = require("./routes/turacozTeam");
const lifeAtTuracoz_routes = require("./routes/lifeAtTuracoz");
const imageSliderTurcoz_routes = require("./routes/imageSliderTuracoz");
const course_routes = require("./routes/course/courseTab");
const webinar_routes = require("./routes/webinar/webinarTab");
const workshop_routes = require("./routes/workshop/workshopTab");
const carrer_routes = require("./routes/carrer");
const requestProposal_routes = require("./routes/requestProposal");
const category_Routes = require("./routes/category");
const contact_Routes = require("./routes/contact");
const headerAdd_Routes = require("./routes/headerAdd");
const seo_routes = require("./routes/seodata");
const announcement_routes = require("./routes/announcement");
const pressRelease_routes = require("./routes/pressRelease");
const footer_routes = require("./routes/footer");
const header_routes = require("./routes/header");
const admin_routes = require("./routes/admin");
const media_routes = require("./routes/media");
const eventConference_routes = require("./routes/eventConference");
const webinarConference_routes = require("./routes/webinarConference");
const inputField_routes = require("./routes/inputField");
const inputCategory_routes = require("./routes/inputCategory");
const DynamicRegisterForm_routes = require("./routes/DynamicRegisterForm");
const SearchResult_routes = require("./routes/searchResult");
const Service_routes = require("./routes/services");

// CORS middleware
// const corsOptions = {
//   origin: [
//     process.env.WEBSITE_APP_URL,
//     process.env.ADMIN_APP_URL,
//   ], // You can adjust the origin to match your frontend URL
//   credentials: true,
// };
// app.use(cors(corsOptions));

// Define your routes
app.use("/api/course", course_routes);
app.use("/api/seodata", seo_routes);
app.use("/api/carrer", carrer_routes);
app.use("/api/webinar", webinar_routes);
app.use("/api/workshop", workshop_routes);
app.use("/api/users", users_routes);
app.use("/api/homepage", homepage_routes);
app.use("/api/client", client_routes);
app.use("/api/blogs", blog_routes);
app.use("/api/category", category_Routes);
app.use("/api/caseStudies", caseStudies_routes);
app.use("/api/whitepapers", whitepaper_routes);
app.use("/api/userDetail", userDetail_routes);
app.use("/api/newsletter", newsletter_routes);
app.use("/api/turacozteam", turacozTeam_routes);
app.use("/api/lifeAtTuracoz", lifeAtTuracoz_routes);
app.use("/api/imageSliderTurcoz", imageSliderTurcoz_routes);
app.use("/api/requestProposal", requestProposal_routes);
app.use("/api/contact", contact_Routes);
app.use("/api/headerAdd", headerAdd_Routes);
app.use("/api/announcement", announcement_routes);
app.use("/api/pressRelease", pressRelease_routes);
app.use("/api/footer", footer_routes);
app.use("/api/header", header_routes);
app.use("/api/admin", admin_routes);
app.use("/api/media", media_routes);
app.use("/api/eventConference", eventConference_routes);
app.use("/api/webinarConference", webinarConference_routes);
app.use("/api/inputField", inputField_routes);
app.use("/api/inputCategory", inputCategory_routes);
app.use("/api/dynamicRegisterForm", DynamicRegisterForm_routes);
app.use("/api/searchResult", SearchResult_routes);
app.use("/api/service", Service_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`${port} port is connected`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();

app.get("/", (req, res) => {
  res.send("Backend Is Active right Now");
});
