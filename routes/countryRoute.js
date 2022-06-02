const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");

const countryController = require("../controller/countryController");

const router = express.Router();

router.get("/", isAuth, countryController.getCountries);

router.get("/:id", isAuth, countryController.getCountry);

router.put(
  "/:id",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  countryController.updateCountry
);

router.post(
  "/",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  countryController.createCountry
);

router.delete("/:id", isAdmin, countryController.deleteCountry);

module.exports = router;
