const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const languageController = require("../controller/languageController");

const router = express.Router();

router.get("/", isAuth, languageController.getLanguages);

router.get("/:id", isAuth, languageController.getLanguage);

router.put(
  "/:id",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  languageController.updateLanguage
);

router.post(
  "/",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  languageController.createLanguage
);

router.delete("/:id", isAdmin, languageController.deleteLanguage);

module.exports = router;
