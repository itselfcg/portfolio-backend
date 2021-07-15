const express = require("express");
const router = express.Router();
const CaseStudyController = require("../controller/case-study");
const checkAuth = require("../middleware/check-auth.js");
const extractFile = require("../middleware/file");

router.post("/", checkAuth,extractFile, CaseStudyController.create);
router.put("/:id", checkAuth,extractFile, CaseStudyController.update);
router.get("/sections", CaseStudyController.getSections);
router.get("/all", CaseStudyController.getAll);
router.get("/:id?/:lang?", CaseStudyController.getByParams);
router.get("/:id/:lang", CaseStudyController.getByProjectAndLanguage);
router.delete("/:id", checkAuth, CaseStudyController.delete);

module.exports = router;
