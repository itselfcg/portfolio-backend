const express = require("express");
const router = express.Router();

const ProjectController = require("../controller/project");
const checkAuth = require("../middleware/check-auth.js");

router.post("/", checkAuth, ProjectController.create);
router.put("/:id", checkAuth, ProjectController.update);
router.get("/:lang", ProjectController.getAll);
router.get("/", ProjectController.getByLanguage);
module.exports = router;
