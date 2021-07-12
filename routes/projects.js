const express = require("express");
const router = express.Router();

const ProjectController = require("../controller/project");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

router.post("/", checkAuth, extractFile, ProjectController.create);
router.put("/:id", checkAuth, extractFile, ProjectController.update);
router.get("/all", ProjectController.getAll);
router.get("/:id?/:lang?", ProjectController.getByParams);
router.delete("/:id", checkAuth, ProjectController.delete);

module.exports = router;
