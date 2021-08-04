const express = require("express");
const router = express.Router();
const TranslationController = require("../controller/translation");
const checkAuth = require("../middleware/check-auth");

router.post("/:languageKey", TranslationController.createFile);
router.put("/", TranslationController.updateFile);
router.get("/", TranslationController.getFile);
router.delete("/", TranslationController.deleteFile);

module.exports = router;
