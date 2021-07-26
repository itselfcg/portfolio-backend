const express = require("express");
const router = express.Router();

const ProjectController = require("../controller/project");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");
const uploadFileAWS = require("../middleware/imageUpload");

router.post("/", checkAuth,uploadFileAWS,ProjectController.create);
router.put("/:id", checkAuth, uploadFileAWS, ProjectController.update);
router.get("/all/:pageSize?/:currentPage?", ProjectController.getAll);
router.get("/:id?/:lang?/:details?/:active?", ProjectController.getByParams);
router.delete("/:id/:deleteAWS?", checkAuth, ProjectController.delete);


module.exports = router;
