const mongoose = require("mongoose");
const CaseStudy = require("../models/case-study");
const Project = require("../models/project");
const ObjectId = require("mongodb").ObjectID;
const deleteImages = require("../middleware/deleteImage");

exports.create = (req, res, next) => {
  var users, insights, sections, pictures;
  const url = req.protocol + "://" + req.get("host");

  if (req.body.users) {
    users = req.body.users;
    if (typeof users === "string") {
      users = JSON.parse(req.body.users);
    }
  }

  if (req.body.pictures) {
    pictures = req.body.pictures;
    if (typeof pictures === "string") {
      pictures = JSON.parse(req.body.pictures);
    }
  }

  if (req.body.insights) {
    insights = req.body.insights;
    if (typeof insights === "string") {
      insights = JSON.parse(req.body.insights);
    }
  }

  if (req.body.sections) {
    sections = req.body.sections;
    if (typeof sections === "string") {
      sections = JSON.parse(req.body.sections);
    }
  }

  var files = req.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].fieldname.includes("user-pic")) {
        var user = users.find((user) => {
          return user.picture.fileName == files[i].originalname;
        });
        user.picture.key = files[i].key;
        user.picture.fileName = files[i].key.split(".")[0];
        user.picture.url = files[i].location;
        continue;
      }

      if (files[i].fieldname.includes("header-pic")) {
        var picture = pictures.find((picture) => {
          return picture.fileName == files[i].originalname;
        });
        picture.key = files[i].key;
        picture.fileName = files[i].key.split(".")[0];
        picture.url = files[i].location;
        continue;
      }

      var property = files[i].fieldname.split("-")[0];
      if (property) {
        var index = sections[property].pictures.findIndex(
          (picture) => picture.fileName == files[i].originalname
        );

        if (index >= 0) {
          var picture = sections[property].pictures[index];
          picture.key = files[i].key;
          picture.fileName = files[i].key.split(".")[0];
          picture.url = files[i].location;
        }
      }
    }
  } else {
    pictures = req.body.pictures;
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
    active: req.body.active,
  });

  caseStudy.save();
  Project.findOneAndUpdate(
    { _id: req.body.project },
    { details: "true" },
    function (err, doc) {
      if (err) throw err;
    }
  );

  res.status(200).json({
    message: "Created",
    id: caseStudy._id,
  });
};

exports.update = (req, res, next) => {
  var users, insights, sections, pictures;
  const url = req.protocol + "://" + req.get("host");

  const caseStudy = new Promise(function (resolve, reject) {
    try {
      if (req.body.users) {
        users = req.body.users;
        if (typeof users === "string") {
          users = JSON.parse(req.body.users);
        }
      }

      if (req.body.pictures) {
        pictures = req.body.pictures;
        if (typeof pictures === "string") {
          pictures = JSON.parse(req.body.pictures);
        }
      }

      if (req.body.insights) {
        insights = req.body.insights;
        if (typeof insights === "string") {
          insights = JSON.parse(req.body.insights);
        }
      }

      if (req.body.sections) {
        sections = req.body.sections;
        if (typeof sections === "string") {
          sections = JSON.parse(req.body.sections);
        }
      }

      var files = req.files;
      if (files) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].fieldname.includes("user-pic")) {
            var user = users.find((user) => {
              return user.picture.fileName == files[i].originalname;
            });
            user.picture.key = files[i].key;
            user.picture.fileName = files[i].key.split(".")[0];
            user.picture.url = files[i].location;
            continue;
          }

          if (files[i].fieldname.includes("header-pic")) {
            var picture = pictures.find((picture) => {
              return picture.fileName == files[i].originalname;
            });
            picture.key = files[i].key;
            picture.fileName = files[i].key.split(".")[0];
            picture.url = files[i].location;
            continue;
          }

          var property = files[i].fieldname.split("-")[0];
          if (property) {
            var index = sections[property].pictures.findIndex(
              (picture) => picture.fileName == files[i].originalname
            );
            if (index >= 0) {
              var picture = sections[property].pictures[index];
              picture.key = files[i].key;
              picture.fileName = files[i].key.split(".")[0];
              picture.url = files[i].location;
            }
          }
        }
      } else {
        pictures = req.body.pictures;
      }

      resolve(
        new CaseStudy({
          _id: req.params.id,
          language: req.body.language,
          project: req.body.project,
          title: req.body.title,
          content: req.body.content,
          sections: sections,
          pictures: pictures,
          users: users,
          insights: insights,
          active: req.body.active,
        })
      );
    } catch {
      reject();
    }
  }).then((caseStudy) => {
    CaseStudy.findById(req.params.id).then((result) => {
      const deletePictures = new Promise(function (resolve) {
        var caseStudyPictures = [];
        var original = result;
        var replacement = caseStudy;

        new Promise(function (resolve) {
          var intersection, remove;

          intersection = original.pictures.filter((o) =>
            replacement.pictures.some((r) => o.key === r.key)
          );
          remove = original.pictures.filter(
            (o) => !intersection.some((i) => o.key === i.key)
          );
          resolve(remove);
        }).then((remove) => {
          for (let i = 0; i < remove.length; i++) {
            if (remove[i].key) {
              caseStudyPictures.push({ Key: remove[i].key });
            }
          }
        });

        new Promise(function (resolve) {
          var intersection, remove;

          intersection = original.users.filter((o) =>
            replacement.users.some((r) => o.picture.key === r.picture.key)
          );
          remove = original.users.filter(
            (o) => !intersection.some((i) => o === i)
          );
          resolve(remove);
        }).then((remove) => {
          for (let i = 0; i < remove.length; i++) {
            if (remove[i].picture.key) {
              caseStudyPictures.push({ Key: remove[i].picture.key });
            }
          }
        });

        for (var property in caseStudy.sections) {
          if (
            original.sections[property].pictures &&
            original.sections[property].pictures.length > 0
          ) {
            new Promise(function (resolve) {
              var intersection, remove;
              intersection = original.sections[property].pictures.filter((o) =>
                replacement.sections[property].pictures.some(
                  (r) => o.key === r.key
                )
              );
              remove = original.sections[property].pictures.filter(
                (o) => !intersection.some((i) => o === i)
              );
              resolve(remove);
            }).then((remove) => {
              for (let i = 0; i < remove.length; i++) {
                if (remove[i].key) {
                  caseStudyPictures.push({ Key: remove[i].key });
                }
              }
            });
          }
        }

        resolve(caseStudyPictures);
      }).then((caseStudyPictures) => {
        if (caseStudyPictures.length > 0) {
          var map = { Objects: caseStudyPictures };
          deleteImages(map);
        }
      });
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
    .populate("project")
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
  var deleteAWS = req.query.aws === "true" ? true : false;

  CaseStudy.findById(req.params.id)
    .then((caseStudy) => {
      var caseStudyPictures = [];

      if (deleteAWS) {
        for (let i = 0; i < caseStudy.pictures.length; i++) {
          if (caseStudy.pictures[i].key) {
            caseStudyPictures.push({ Key: caseStudy.pictures[i].key });
          }
        }

        for (let i = 0; i < caseStudy.users.length; i++) {
          if (caseStudy.users[i].picture.key) {
            caseStudyPictures.push({ Key: caseStudy.users[i].picture.key });
          }
        }

        for (var property in caseStudy.sections) {
          if (
            caseStudy.sections[property].pictures &&
            caseStudy.sections[property].pictures.length > 0
          ) {
            for (
              let i = 0;
              i < caseStudy.sections[property].pictures.length;
              i++
            ) {
              if (caseStudy.sections[property].pictures[i].key) {
                caseStudyPictures.push({
                  Key: caseStudy.sections[property].pictures[i].key,
                });
              }
            }
          }
        }
      }
      CaseStudy.deleteOne({ _id: req.params.id })
        .then((result) => {
          if (result.n > 0) {
            Project.findOneAndUpdate(
              { _id: caseStudy.project },
              { details: "false" },
              function (err, doc) {
                if (err) {
                  res.status(500).json({
                    message: "Failed to update project.",
                  });
                }
                if (deleteAWS && caseStudyPictures.length > 0) {
                  var map = { Objects: caseStudyPictures };
                  deleteImages(map);
                }
                res.status(200).json({ message: "Deletion successful!" });
              }
            );
          } else {
            res.status(401).json({ message: "Not authorized!" });
          }
        })
        .catch((error) => {
          res.status(502).json({
            message: "Deleting case study failed",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Case study not found",
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
