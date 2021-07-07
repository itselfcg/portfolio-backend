const express = require("express");
const router = express.Router();
const CaseStudy = require("../models/case-study");
const ObjectId = require('mongodb').ObjectID;
const checkAuth = require('../middleware/check-auth.js');
// Body parser
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/",checkAuth, jsonParser, (req, res, next) => {
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

 router.get("/:lang", (req, res, next) => {
  CaseStudy.find({ language: req.params.lang }).then((caseStudies) => {
    res.status(200).json({
      message: "Ok",
      caseStudies: caseStudies,
    });
  });
});

router.get("/:lang/:id", (req, res, next) => {
  CaseStudy.findOne(
    { language: req.params.lang, project: ObjectId(req.params.id) },
    function (err, user) {
      if (!user) {
        res.status(404).json({
          message: "Not found",
        });
      }
    }
  ).populate("project")
  .then((caseStudy) => {
    if (caseStudy!=null) {
      res.status(200).json({
        message: "Ok",
        caseStudy: caseStudy,
      });
    }
  });
});

module.exports = router;
