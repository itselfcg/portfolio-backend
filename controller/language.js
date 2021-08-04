const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");
const Language = require("../models/language");

dotenv.config();

exports.create = (req, res, next) => {
  const language = new Language({
    name: req.body.name,
    key: req.body.key,
    fileName: req.body.fileName,
  });

  language
    .save()
    .then((result) => {
      res.status(200).json({
        message: "Language created",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getAll = (req, res, next) => {
  Language.find()
    .then((language) => {
      res.status(200).json({
        message: "Ok",
        languages: language,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Fetching language failed!",
      });
    });
};

exports.delete = (req, res, next) => {
  Language.deleteOne({ _id: req.params.id })
    .then((language) => {
      res.status(200).json({
        message: "Ok",
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Deleting language failed!",
      });
    });
};
