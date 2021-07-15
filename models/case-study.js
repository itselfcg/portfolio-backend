const mongoose = require("mongoose");
Schema=mongoose.Schema;

const caseStudySchema = mongoose.Schema({
  language: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  title: String,
  content: String,
  sections: {
    rol: {
      title: String,
      content: String,
    },
    duration: {
      title: String,
      content: String,
    },
    vision: {
      title: String,
      content: String,
    },
    challenges: {
      title: String,
      list: [String],
    },
    start: {
      title: String,
      content: String,
      questions: [String],
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    user: {
      title: String,
      content: String,
    },
    ideation: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    journey: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    sitemap: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    wireframes: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    usabilityStudy: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },

    mockups: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    prototypes: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
    accessibility: {
      title: String,
      content: String
    },
    styleGuide: {
      title: String,
      content: String,
      pictures: [
        {
          fileName:String,
          url: String,
          description: String,
        },
      ],
    },
  },
  pictures: [
    {
      fileName:String,
      url: String,
      description: String,
    },
  ],
  insights: [
    {
      icon: String,
      title: String,
      content: String,
    },
  ],
  users: [
    {
      name: String,
      age: String,
      occupation: String,
      story: String,
      pictures: {
        fileName:String,
        url: String,
        description: String,
      },
    },
  ],
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
