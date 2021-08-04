const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Translation = require("../models/translation");
const dotenv = require("dotenv");
dotenv.config();

exports.update = (req, res, next) => {
  var fs = require("fs");
  const file = req.params.languageKey;

  fs.readFile("public/" + file + ".json", "utf8", function (err, data) {
    if (err) {
      return res.status(400).json({ message: "File not found" });
    }
    var newFile = JSON.parse(data);
    var translations = new Translation({
      home: req.body.home,
      about: req.body.about,
      work: req.body.work,
      contact: req.body.contact,
      navbar: req.body.navbar,
      actions: req.body.actions,
    });

    var fieldsNew = Object.keys(translations.toObject());

    for (let i = 0; i < fieldsNew.length; i++) {
      for (let fieldsOriginal in newFile) {
        if (fieldsNew[i] === fieldsOriginal) {
          for (let propObject in translations[fieldsOriginal]) {
            newFile[fieldsOriginal][propObject] =
              translations[fieldsOriginal][propObject];
          }
          break;
        }
      }
    }

    let stringifyFile = JSON.stringify(newFile);
    fs.writeFile("public/" + file + ".json", stringifyFile, "utf8", function (err) {
      if (err) {
        return res.status(500).json({ message: "Couldn't update file" });
      }
      res.status(200).json({ message: "File was updated" });
    });
  });
};

exports.getFile = (req, res, next) => {
  const file = req.params.languageKey;
  var fs = require("fs");
  fs.readFile("public/" + file + ".json", "utf8", function (err, data) {
    if (err) {
      return res.status(400).json({ message: "File not found" });
    }
    var result = JSON.parse(data);
    res.status(200).json({ message: "File was found", file: result });
  });
};
