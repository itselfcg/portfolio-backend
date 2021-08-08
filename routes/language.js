const express = require("express");
const router = express.Router();

const LanguageController = require("../controller/language");
const checkAuth = require("../middleware/check-auth");

router.post("/",checkAuth, LanguageController.create);
router.put("/:id",checkAuth, LanguageController.update);
router.get("/:id", LanguageController.getID);
router.get("/", LanguageController.getAll);
router.delete("/:id",checkAuth, LanguageController.delete);

module.exports = router;
