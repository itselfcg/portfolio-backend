const express = require("express");
const router = express.Router();
const CaseStudy = require("../models/case-study");
const ObjectId = require('mongodb').ObjectID;

// Body parser
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/", jsonParser, (req, res, next) => {
  const caseStudy = new CaseStudy({
    language: req.body.language,
    project: req.body.project,
    title: req.body.title,
    content: req.body.content,
    sections: req.body.sections,
    pictures: req.body.pictures,
    insights: req.body.insights,
    users: req.body.users,
  });
  caseStudy.save();
  res.status(200).json({
    message: "Ok",
    id: caseStudy._id,
  });
});

/* router.use("/:lang", (req, res, next) => {
  CaseStudy.find({ language: req.params.lang }).then((caseStudies) => {
    res.status(200).json({
      message: "Ok",
      caseStudies: caseStudies,
    });
  });
}); */

router.use("/:lang/:id", (req, res, next) => {
  CaseStudy.findOne({  "language": req.params.lang ,"project": ObjectId(req.params.id) }).populate("project").then((caseStudy) => {
    console.log(caseStudy);
    if (caseStudy) {
      res.status(200).json({
        message: "Ok",
        caseStudy: caseStudy,
      });
    } else {
      res.status(404).json({
        message: "Not found",
      });
    }
  });
});

module.exports = router;
