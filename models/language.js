const mongoose = require("mongoose");

const languageSchema = mongoose.Schema({
  name: String,
  key: String,
  fileName: String,
});

module.exports = mongoose.model("Language", languageSchema);
