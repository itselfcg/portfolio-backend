const mongoose = require("mongoose");

const translationSchema = mongoose.Schema({
  home: {},
  about: {},
  work: {},
  contact: {},
  navbar: {},
  actions: {},
});

module.exports = mongoose.model("Translation", translationSchema);
