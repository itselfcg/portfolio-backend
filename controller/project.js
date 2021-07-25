const Project = require("../models/project");
const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectID;
const deleteImages = require("../middleware/deleteImage");

exports.create = (req, res, next) => {
  var pictures, labels;
  const url = req.protocol + "://" + req.get("host");

  if (req.body.pictures) {
    pictures = req.body.pictures;
    if (typeof pictures === "string") {
      pictures = JSON.parse(req.body.pictures);
    }
  }

  if (req.body.labels) {
    labels = req.body.labels;
    if (typeof labels === "string") {
      labels = JSON.parse(req.body.labels);
    }
  }
  var files = req.files;

  if (files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].fieldname.includes("preview-pic")) {
        var picture = pictures.find((picture) => {
          return picture.fileName == files[i].originalname;
        });

        picture.key = files[i].key;
        picture.fileName = files[i].key.split(".")[0];
        picture.url = files[i].location;
        continue;
      }
    }
  }

  const project = new Project({
    language: req.body.language,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    pictures: pictures,
    labels: labels,
    git_url: req.body.git_url,
    details: req.body.details,
    active: req.body.active,
    preview_url: req.body.preview_url,
  });
  project.save();
  res.status(200).json({
    message: "Ok",
    id: project._id,
  });
};

exports.update = (req, res, next) => {
  var pictures, labels;
  const url = req.protocol + "://" + req.get("host");

  const project = new Promise(function (resolve, reject) {
    try {
      if (req.body.pictures) {
        pictures = req.body.pictures;
        if (typeof pictures === "string") {
          pictures = JSON.parse(req.body.pictures);
        }
      }

      if (req.body.labels) {
        labels = req.body.labels;
        if (typeof labels === "string") {
          labels = JSON.parse(req.body.labels);
        }
      }
      var files = req.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].fieldname.includes("preview-pic")) {
            var picture = pictures.find((picture) => {
              return picture.fileName == files[i].originalname;
            });
            picture.key = files[i].key;
            picture.fileName = files[i].key.split(".")[0];
            picture.url = files[i].location;
            continue;
          }
        }
      }
      resolve(
        (result = new Project({
          _id: req.params.id,
          language: req.body.language,
          name: req.body.name,
          title: req.body.title,
          content: req.body.content,
          pictures: pictures,
          labels: labels,
          git_url: req.body.git_url,
          details: req.body.details,
          active: req.body.active,
          preview_url: req.body.preview_url,
        }))
      );
    } catch {
      reject();
    }
  });

  project.then((project) => {
    Project.findById(req.params.id).then((result) => {
      const deletePictures = new Promise(function (resolve) {
        var original = [...result.pictures];
        var replacement = [...project.pictures];
        var intersection = original.filter((o) =>
          replacement.some((r) => o.key === r.key)
        );

        var remove = original.filter((o) => !intersection.some((i) => o === i));

        var projectPictures = [];
        for (let i = 0; i < remove.length; i++) {
          if (remove[i].key) {
            projectPictures.push({ Key: remove[i].key });
          }
        }
        resolve(projectPictures);
      }).then((projectPictures) => {
        if (projectPictures.length > 0) {
          var map = { Objects: projectPictures };
          deleteImages(map);
        }
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
    .then((projects) => {
      res.status(200).json({
        message: "Ok",
        projects: projects,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching failed",
      });
    });
};

exports.delete = (req, res, next) => {
  Project.findById(req.params.id).then((project) => {
    var projectPictures = [];
    for (let i = 0; i < project.pictures.length; i++) {
      if (project.pictures[i].key) {
        projectPictures.push({ Key: project.pictures[i].key });
      }
    }

    Project.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.n > 0) {
          if (projectPictures.length > 0) {
            var map = { Objects: projectPictures };
            deleteImages(map);
          }
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
  });
};
