const fs = require("fs");
const Translation = require("../models/translation");
const Language = require("../models/language");

exports.createFile = (req, res, next) => {
  const file = req.body.fileName;
  var translations = new Translation({
    home: req.body.home,
    about: req.body.about,
    work: req.body.work,
    contact: req.body.contact,
    navbar: req.body.navbar,
    actions: req.body.actions,
  });
  let stringifyFile = JSON.stringify(translations);
  fs.writeFile("public/" + file, stringifyFile, "utf8", function (err) {
    if (err) {
      return res.status(500).json({ message: "Couldn't update file" });
    }
    res.status(201).json({ message: "File was updated" });
  });
};

exports.updateFile = (req, res, next) => {
  const file = req.body.fileName;

  var translations = new Translation({
    home: req.body.home,
    about: req.body.about,
    work: req.body.work,
    contact: req.body.contact,
    navbar: req.body.navbar,
    actions: req.body.actions,
  });

  let stringifyFile = JSON.stringify(translations);
  fs.writeFile("public/" + file, stringifyFile, "utf8", function (err) {
    if (err) {
      return res.status(500).json({ message: "Couldn't update file" });
    }
    res.status(200).json({ message: "File was updated" });
  });
};

exports.getFile = (req, res, next) => {
  const key = req.params.languageKey;

  Language.findOne({ key: key }, function (error, language) {
    if (error) {
      return res.status(400).json({
        message: "Couldn't find file!",
      });
    }
    if (!language) {
      return res.status(404).json({
        message: "Couldn't find language",
      });
    }

    const file = language.fileName;
    fs.readFile("public/" + file, "utf8", function (err, data) {
      if (err) {
        return res.status(404).json({ message: "File not found" });
      }
      var result = JSON.parse(data);
      result.fileName = language.fileName;
      res.status(200).json({ result });
    });
  });
};

exports.deleteFile = (req, res, next) => {
  const key = req.params.languageKey;

  Language.findOne({ key: key }, function (error, language) {
    if (error) {
      return res.status(400).json({
        message: "Couldn't find file!",
      });
    }
    if (!language) {
      return res.status(404).json({
        message: "Couldn't find language",
      });
    }
    const file = language.fileName;
    fs.stat("public/" + file, function (err, stats) {
      if (err) {
        return res.status(400).json({
          message: "Couldn't find file!",
        });
      }

      fs.unlink("public/" + file, function (err) {
        if (err) {
          return res.status(500).json({
            message: "Deleting file failed!",
          });
        }
        return res.status(200).json({
          message: "Ok",
        });
      });
    });
  });
};

exports.getSections = (req, res, next) => {
  var sections = [];
  Translation.schema.eachPath(function (path) {
    if (!path.includes("_")) {
      sections.push(path);
    }
  });

  res.status(200).json({
    message: "Ok",
    sections: sections,
  });
};
