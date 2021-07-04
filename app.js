const path=require('path')
const express = require("express");
const projectsRoutes = require("./routes/projects");
const caseStudyRoutes = require("./routes/case-study");
const mongoose = require("mongoose");

const app = express();
const dotenv = require('dotenv');
dotenv.config();


mongoose
  .connect(
    "mongodb+srv://"+process.env.MONGO_DB_USERNAME+":"+process.env.MONGO_DB_PASSWORD+"@cluster0.yxlvk.mongodb.net/portfolio?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

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
app.use("/pictures",express.static(path.join('pictures')));

module.exports = app;
