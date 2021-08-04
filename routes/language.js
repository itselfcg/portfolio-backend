const express = require("express");
const router = express.Router();

const LanguageController = require("../controller/language");
const checkAuth = require("../middleware/check-auth");
const uploadFileAWS = require("../middleware/imageUpload");

router.post("/",LanguageController.create);
router.get("/",LanguageController.getAll);
router.delete("/:id",LanguageController.delete);

module.exports = router;
