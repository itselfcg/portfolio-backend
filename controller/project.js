const Project = require("../models/project");

exports.create = (req, res, next) => {
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
    id: project._id,
  });
};

exports.update = (req, res, next) => {
  const project = new Project({
    _id: req.body.id,
    language: req.body.language,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    git_url: req.body.git_url,
    details_url: req.body.details_url,
    preview_url: req.body.preview_url,
    picture: req.body.picture,
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
  Project.find({ language: req.params.lang }).then((projects) => {
    res.status(200).json({
      message: "Ok",
      projects: projects,
    });
  });
};
exports.getByLanguage = (req, res, next) => {
  Project.find().then((projects) => {
    res.status(200).json({
      message: "Ok",
      projects: projects,
    });
  });
};
