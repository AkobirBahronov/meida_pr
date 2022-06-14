const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");
const genreController = require("../controllers/genre.controller");

const router = express.Router();

router.get("/", isAuth, genreController.getGenres);

router.get("/:id", isAuth, genreController.getGenre);

router.put(
  "/:id",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  genreController.updateGenre
);

router.post(
  "/",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  genreController.createGenre
);

router.delete("/:id", isAdmin, genreController.deleteGenre);

module.exports = router;
