const express = require("express");
const router = express.Router();
const Project = require("../models/project");

// Body parser
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", jsonParser, (req, res, next) => {
  const project = new Project({
    language: req.body.language,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    picture: {
      url: req.body.picture.url,
      description: req.body.picture.description,
    },
    labels: req.body.labels,
    git_url: req.body.git_url,
    details_url: req.body.details_url,
    preview_url: req.body.preview_url,
  });
  project.save();
  res.status(200).json({
    message: "Ok",
    id:project._id
  });
});

router.use("/:lang", (req, res, next) => {
  Project.find({ "language": req.params.lang }).then((projects) => {
    res.status(200).json({
      message: "Ok",
      projects: projects,
    });
  });
});

module.exports = router;
