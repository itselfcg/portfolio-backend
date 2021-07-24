const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const checkAuth = require("../middleware/check-auth.js");

router.post("/register",checkAuth, UserController.create);

router.post("/login", UserController.login );

module.exports = router;
