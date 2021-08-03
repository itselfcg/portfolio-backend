const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  language: String,
  creation_date: Date,
  name: String,
  title: String,
  content: String,
  pictures: [
    {
      fileName: String,
      key: String,
      url: String,
      description: String,
    },
  ],
  labels: [String],
  git_url: String,
  details: Boolean,
  preview_url: String,
  active: Boolean,
});

module.exports = mongoose.model("Project", projectSchema);
