const express = require("express");
const router = express.Router();
const caseStudies = [
  {
    id: "auxilium",
    name: "Auxilium",
    title: "Creating user-centered designs for social good",
    rol: "Ux designer",
    duration: "5 weeks",
    summary:
      "Auxilium is my last project for the Google UX Design Professional Certificate. Keep scrolling to learn more!",
    vision:
      "Auxilium is a nonprofit that offers first aid training and helps marginalized communities receive medical attention. Auxilium believes that first aid knowledge should be within everyones reach.    ",
    challenge: [
      "Create an app where users can learn about first aid procedures.",
      "Create a website where users can learn about the non-profit and learn first aid procedures.",
      "• Create a friendly user interface.     ",
    ],
    introduction:
      "To start I conducted user research, some of the questions asked were  1. Do you have any first aid knowledge?",

    sections: [
      {
        id: "1",
        name: "vision",
        description:
          "Auxilium is a nonprofit that offers first aid training and helps marginalized communities receive medical attention. Auxilium believes that first aid knowledge should be within everyone's reach.",
      },
      {
        id: "2",
        name: "challenges",
        description:
          "• Create an app where users can learn about first aid procedures.<br>• Create a website where users can learn about the non-profit and learn first aid procedures.<br>• Create a friendly user interface.",
      },
      {
        id: "3",
        name: "start",
        description:
          "To start I conducted user research, some of the questions asked were: <br>1. Do you have any first aid knowledge? <br>2. Have you ever been in a situation that requires first aid ?<br>3. What did you do? <br>4. Where would you look for info about first aid? 5. What makes this site trustworthy? <br>The feedback from users helped me know who they are and their needs.",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "sdfsdf",
          },
        ],
      },
      {
        id: "4",
        name: "users",
        description:
          "Auxilium’s primary users include people with limited knowledge about first aid that need a trusty reference when they have an emergency.",
      },
      {
        id: "5",
        name: "ideation",
        description:
          "Using Crazy 8’s approach I sketched some concepts for the app design based on what I learned about users. Crazy 8’s allowed me to rapidly brainstorm multiple solutions for the problem.",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "Picture url 2",
          },
        ],
      },
      {
        id: "6",
        name: "sitemap",
        description: "",
      },
      {
        id: "7",
        name: "wireframes",
        description:
          "Taking the time to draft multiple times on the same screen ensured that I could have multiple scenarios where I could take the best elements of each draft.",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "",
          },
        ],
      },
      {
        id: "8",
        name: "insights",
        description:
          "After finishing the low fidelity prototype I conducted a moderated usability study. I asked different participants to run through different scenarios in the prototype, their feedback helped me define insights to improve the user experience.",
      },
      {
        id: "9",
        name: "mockups",
        description:
          "After updating wireframes with insights defined in the usability study, mockups can be created. They’ll give a better idea of how the final product will look like.",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "Picture url 2",
          },
        ],
      },
      {
        id: "10",
        name: "prototype",
        description:
          "High-fidelity prototype When mockups are finished, interactions are added to create a complete picture of the completed design.",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "Picture url 2",
          },
        ],
      },
      {
        id: "11",
        name: "styleGuide",
        description: "",
        pictures: [
          {
            id: "1",
            title: "Picture name 2",
            description: "Picture alt text 2",
            url: "Picture url 2",
          },
        ],
      },
    ],

    users: [
      {
        id: "1",
        name: "User 1",
        age: "User 1",
        occupation: "User 1 description",
        description: "User 1 description",
        pictures: {
          id: "1",
          title: "Picture name",
          description: "Picture alt text",
          url: "Picture url",
        },
      },
      {
        id: "1",
        name: "User 1",
        age: "User 1",
        occupation: "User 1 description",
        description: "User 1 description",
        pictures: {
          id: "1",
          title: "Picture name",
          description: "Picture alt text",
          url: "Picture url",
        },
      },
    ],
    insights: [
      {
        id: "1",
        title: "Insight 1",
        description: "Insights 1 description",
        icon: "fa fa-question"

      },
    ],
    pictures: [
      {
        id: "2",
        title: "Picture name 2",
        description: "Picture alt text 2",
        url: "https://mdbootstrap.com/img/Photos/Slides/img%20(88).jpg",
      },
    ],
  },
];

router.use("/:id", (req, res, next) => {
  var caseStudy = caseStudies.find(
    (caseStudy) => caseStudy.id === req.params.id
  );
  if (caseStudy) {
    res.json({
      status: "200",
      message: "Ok",
      caseStudy: caseStudy,
    });
  } else {
    res.json({
      status: "404",
      message: "Not found",
    });
  }
});

module.exports = router;
