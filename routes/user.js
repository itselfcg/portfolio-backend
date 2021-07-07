const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");

router.post("/register", UserController.createUser );

router.post("/login", UserController.login );

module.exports = router;
