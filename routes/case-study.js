const express = require("express");
const router = express.Router();
const CaseStudyController = require("../controller/case-study");
const checkAuth = require("../middleware/check-auth.js");
const extractFile = require("../middleware/file");
const uploadFileAWS = require("../middleware/imageUpload");

router.post("/", checkAuth,uploadFileAWS, CaseStudyController.create);
router.put("/:id", checkAuth,uploadFileAWS, CaseStudyController.update);
router.get("/sections", CaseStudyController.getSections);
router.get("/all/:pageSize?/:currentPage?", CaseStudyController.getAll);
router.get("/:id?/:lang?/:active?", CaseStudyController.getByParams);
router.get("/project/:id/:lang", CaseStudyController.getByProjectAndLanguage);
router.delete("/:id/:deleteAWS?", checkAuth, CaseStudyController.delete);

module.exports = router;
