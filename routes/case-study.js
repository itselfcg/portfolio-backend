const express = require("express");
const router = express.Router();
const CaseStudyController = require("../controller/case-study");
const checkAuth = require("../middleware/check-auth.js");

router.post("/", checkAuth, CaseStudyController.create);
router.put("/:id", checkAuth, CaseStudyController.update);
router.get("/all", CaseStudyController.getAll);
router.get("/:id?/:lang?", CaseStudyController.getByParams);
router.get("/:id/:lang", CaseStudyController.getByProjectAndLanguage);

module.exports = router;
