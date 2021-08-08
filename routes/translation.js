const express = require("express");
const router = express.Router();
const TranslationController = require("../controller/translation");
const checkAuth = require("../middleware/check-auth");

router.post("/",checkAuth, TranslationController.createFile);
router.put("/",checkAuth, TranslationController.updateFile);
router.get("/sections", TranslationController.getSections);
router.get("/:languageKey", TranslationController.getFile);
router.delete("/:languageKey",checkAuth, TranslationController.deleteFile);

module.exports = router;
