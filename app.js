const path=require('path')
const express = require("express");
const projectRoutes = require("./routes/projects");
const caseStudyRoutes = require("./routes/case-study");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");

const app = express();

const dotenv = require('dotenv');
dotenv.config();


// Body parser
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

mongoose
  .connect(
    "mongodb+srv://"+process.env.MONGO_DB_USERNAME+":"+process.env.MONGO_DB_PASSWORD+"@cluster0.yxlvk.mongodb.net/portfolio?retryWrites=truew=majority"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/cases", caseStudyRoutes);

app.use("/pictures",express.static(path.join('pictures')));
app.use(express.json());
module.exports = app;
