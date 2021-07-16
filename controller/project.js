const Project = require("../models/project");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;

exports.create = (req, res, next) => {
  let imagePath;
  let description;

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/pictures/" + req.file.filename;
    description=req.file.originalname;
  } else {
    imagePath = req.body.picture.url;
    description = req.body.picture.description;
  }



  const url = req.protocol + "://" + req.get("host");
  const project = new Project({
    language: req.body.language,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    picture: {
      url: imagePath,
      description: description,
    },
    labels: req.body.labels,
    git_url: req.body.git_url,
    details: req.body.details,
    preview_url: req.body.preview_url,
  });
  project.save();
  res.status(200).json({
    message: "Ok",
    id: project._id,
  });
};

exports.update = (req, res, next) => {
  let imagePath="";
  let description="";

  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/pictures/" + req.file.filename;
    description=req.file.originalname;
  } else {
    if(req.body.picture){
    imagePath = req.body.picture.url;
    description = req.body.picture.description;
    }
  }


  const project = new Project({
    _id: req.params.id,
    language: req.body.language,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    git_url: req.body.git_url,
    details_url: req.body.details_url,
    preview_url: req.body.preview_url,
    picture: {
      url: imagePath,
      description: description,
    },
    labels: req.body.labels,
  });

  Project.updateOne({ _id: req.params.id }, project)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate project!",
      });
    });
};

exports.getAll = (req, res, next) => {
  Project.find().then((projects) => {
    res.status(200).json({
      message: "Ok",
      projects: projects,
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
  if (req.query.details) {
    criteria.$or.push({ details: req.query.details });
  }

  Project.find(criteria)
    .then((project) => {
      res.status(200).json({
        message: "Ok",
        project: project,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching failed",
      });
    });
};

exports.delete = (req, res, next) => {
  Project.deleteOne({ _id: req.params.id })
    .then((result) => {
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
