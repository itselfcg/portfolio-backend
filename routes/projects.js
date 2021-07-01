const express = require("express");
const router = express.Router();
const projects= [
  {
    id:1,
    title: 'First Post',
    description: "This is the first post's content",
    preview_picture: 'https://i.ibb.co/DkmmDq7/picture.jpg',
    labels: ['UX', 'UI'],
    git_url: 'url_git',
    preview_url: '',
    details_url: 'auxilium',
  },
  {
    id:2,
    title: 'First Post',
    description: "This is the first post's content",
    preview_picture: 'https://i.ibb.co/DkmmDq7/picture.jpg',
    labels: ['Angular', 'NodeJS'],
    git_url: 'url_git',
    preview_url: '',
    details_url: '',
  },
  {
    id:3,
    title: 'First Post',
    description: "This is the first post's content",
    preview_picture: 'https://i.ibb.co/DkmmDq7/picture.jpg',
    labels: ['Angular'],
    git_url: 'url_git',
    preview_url: '',
    details_url: '',
  },
  {
    id:4,
    title: 'First Post',
    description: "This is the first post's content",
    preview_picture: 'https://i.ibb.co/DkmmDq7/picture.jpg',
    labels: ['UX'],
    git_url: 'url_git',
    preview_url: '',
    details_url: '',
  },
  {
    id:5,
    title: 'First Post',
    description: "This is the first post's content",
    preview_picture: 'https://i.ibb.co/DkmmDq7/picture.jpg',
    labels: ['NodeJS'],
    git_url: '',
    preview_url: '',
    details_url: '',
  },
];
router.use('/',(req, res, next) => {

  res.status(200).json({
    message:"Ok",
    projects:projects
  });

});


module.exports=router;
