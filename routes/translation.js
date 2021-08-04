const express = require("express");
const router = express.Router();
const TranslationController = require("../controller/translation");
const checkAuth = require("../middleware/check-auth");

router.put("/:languageKey", TranslationController.update);
router.get("/:languageKey", TranslationController.getFile);

module.exports = router;
