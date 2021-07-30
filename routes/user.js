const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const checkAuth = require("../middleware/check-auth");

router.post("/register", checkAuth, UserController.create);
router.post("/login", UserController.login);
router.post("/update", checkAuth, UserController.changePassword);

module.exports = router;
