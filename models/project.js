const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  language: String,
  name: String,
  title: String,
  content: String,
  picture: {
    url: String,
    description: String,
  },
  labels: [String],
  git_url: String,
  details_url: String,
  preview_url: String,
});

module.exports = mongoose.model("Project", projectSchema);
