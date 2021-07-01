const express = require("express");
const projectsRoutes = require("./routes/projects");
const caseStudyRoutes = require("./routes/case-study");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/projects", projectsRoutes);
app.use("/api/cases", caseStudyRoutes);

module.exports = app;
