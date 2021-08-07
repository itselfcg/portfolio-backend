const express = require("express");
const router = express.Router();
const TranslationController = require("../controller/translation");
const checkAuth = require("../middleware/check-auth");

router.post("/", TranslationController.createFile);
router.put("/", TranslationController.updateFile);
router.get("/sections", TranslationController.getSections);
router.get("/:languageKey", TranslationController.getFile);
router.delete("/:languageKey", TranslationController.deleteFile);

module.exports = router;
