const mongoose = require("mongoose");
const CaseStudy = require("../models/case-study");
const ObjectId = require("mongodb").ObjectID;

exports.create = (req, res, next) => {
  var users, insights, sections;
  var pictures = [];
  const url = req.protocol + "://" + req.get("host");

  if (req.body.users) {
    users = JSON.parse(req.body.users);
  }

  if (req.body.insights) {
    insights = JSON.parse(req.body.insights);
  }

  if (req.body.sections) {
    sections = JSON.parse(req.body.sections);
  }

  var files = req.files;
  for (let i = 0; i < files.length; i++) {
    if (files[i].fieldname.includes("user-pic")) {
      var user = users.find((user) => {
        return user.pictures.name == files[i].originalname;
      });
      user.pictures.fileName = files[i].filename;
      user.pictures.url = url + "/pictures/" + files[i].filename;
      continue;
    }

    if (files[i].fieldname.includes("header-pic")) {
      const picture = {
        fileName: files[i].filename,
        description: files[i].filename,
        url: url + "/pictures/" + files[i].filename,
      };
      pictures.push(picture);
      continue;
    }

    var property = files[i].fieldname.split("-")[0];
    if (property) {
      var index = sections[property].pictures.findIndex(
        (picture) => picture.name == files[i].originalname
      );
      if (index >= 0) {
        var picture = sections[property].pictures[index];
        picture.fileName = files[i].filename;
        picture.url = url + "/pictures/" + files[i].filename;
      }
    }
  }

   const caseStudy = new CaseStudy({
    language: req.body.language,
    project: req.body.project,
    title: req.body.title,
    content: req.body.content,
    sections: sections,
    pictures: pictures,
    users: users,
    insights: insights,
  });

  caseStudy.save();
  res.status(200).json({
    message: "Created",
    id: caseStudy._id,
  });
};

exports.update = (req, res, next) => {
  const caseStudy = new CaseStudy({
    _id: req.body.id,
    language: req.body.language,
    project: req.body.project,
    title: req.body.title,
    content: req.body.content,
    sections: req.body.sections,
    pictures: req.body.pictures,
    insights: req.body.insights,
    users: req.body.users,
  });

  CaseStudy.updateOne({ _id: req.params.id }, caseStudy)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Updated" });
      } else {
        res.status(500).json({
          message: "Couldn't update post",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching failed",
      });
    });
};

exports.getByProjectAndLanguage = (req, res, next) => {
  CaseStudy.findOne(
    { language: req.params.lang, project: ObjectId(req.params.id) },
    function (err, user) {
      if (!user) {
        res.status(500).json({
          message: "Fetching failed",
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

exports.getAll = (req, res, next) => {
  CaseStudy.find()
    .then((caseStudy) => {
      res.status(200).json({
        message: "Ok",
        caseStudy: caseStudy,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching case study failed!",
      });
    });
};

exports.getByParams = (req, res, next) => {
  const criteria = {};
  criteria.$or = [];

  if (req.query.id && mongoose.Types.ObjectId.isValid(req.query.id)) {
    criteria.$or.push({ _id: req.query.id });
  }
  if (req.query.lang) {
    criteria.$or.push({ language: req.query.lang });
  }

  CaseStudy.find(criteria)
    .then((caseStudy) => {
      res.status(200).json({
        message: "Ok",
        caseStudy: caseStudy,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching failed",
      });
    });
};

exports.delete = (req, res, next) => {
  CaseStudy.deleteOne({ _id: req.params.id })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};

exports.getSections = (req, res, next) => {
  var sections = [];
  CaseStudy.schema.eachPath(function (path) {
    if (path.includes("sections")) {
      var section = path.split(".")[1];
      if (!sections.includes(section)) {
        sections.push(section);
      }
    }
  });

  res.status(200).json({
    message: "Ok",
    sections: sections,
  });
};
