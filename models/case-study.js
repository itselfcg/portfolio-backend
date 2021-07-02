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
      content: String,
    },
    start: {
      title: String,
      content: String,
      pictures: [
        {
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
          url: String,
          description: String,
        },
      ],
    },
    styleGuide: {
      title: String,
      content: String,
      pictures: [
        {
          url: String,
          description: String,
        },
      ],
    },
  },

  pictures: [
    {
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
        url: String,
        description: String,
      },
    },
  ],
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
