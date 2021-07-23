const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.create = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      name: req.body.name,
      password: hash,
    });

    user
      .save()
      .then((result) => {
        res.status(200).json({
          message: "User created",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
};

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ name: req.body.name })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Auth failed" });
      }
      fetchedUser = user;

      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) =>
    {

      if (!result) {
        return res.status(401).json({ message: "Auth failed" });
      }


      const token = jwt.sign(
        { user: fetchedUser.name, id: fetchedUser._id },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ token: token,expiresIn: 3600 });
    })
    .catch((err) => {
      console.log(err);

      return res.status(401).json({ message: "Auth failed" });
    });
};
