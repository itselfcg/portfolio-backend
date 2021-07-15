const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  language: String,
  name: String,
  title: String,
  content: String,
  picture: {
    fileName:String,
    url: String,
    description: String,
  },
  labels: [String],
  git_url: String,
  details: String,
  preview_url: String,
});

module.exports = mongoose.model("Project", projectSchema);
