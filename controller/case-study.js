const CaseStudy = require("../models/case-study");
const ObjectId = require("mongodb").ObjectID;

exports.create = (req, res, next) => {
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
};

exports.getByLanguage = (req, res, next) => {
  CaseStudy.find({ language: req.params.lang }).then((caseStudies) => {
    res.status(200).json({
      message: "Ok",
      caseStudies: caseStudies,
    });
  });
};

exports.getByProjectAndLanguage = (req, res, next) => {
  CaseStudy.findOne(
    { language: req.params.lang, project: ObjectId(req.params.id) },
    function (err, user) {
      if (!user) {
        res.status(404).json({
          message: "Not found",
        });
      }
    }
  )
    .populate("project")
    .then((caseStudy) => {
      if (caseStudy != null) {
        res.status(200).json({
          message: "Ok",
          caseStudy: caseStudy,
        });
      }
    });
};
