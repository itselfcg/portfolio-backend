const express = require("express");
const router = express.Router();
const CaseStudyController = require("../controller/case-study");
const checkAuth = require("../middleware/check-auth.js");

router.post("/", checkAuth, CaseStudyController.create);
router.get("/:lang", CaseStudyController.getByLanguage);
router.get("/:lang/:id", CaseStudyController.getByProjectAndLanguage);

module.exports = router;
