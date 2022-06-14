const express = require("express");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const { body } = require("express-validator");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");
const moviesController = require("../controllers/movies.controller");

const router = express.Router();

const detailValidator = [
  body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
  body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
  body("name.en", "Name in en is required.").trim().not().isEmpty(),
  body("description.uz", "DescriptionUz is required.").trim().not().isEmpty(),
  body("description.ru", "DescriptionRu is required.").trim().not().isEmpty(),
  body("description.en", "DescriptionEn is required.").trim().not().isEmpty(),
  body("age", "age should be valid.").custom((value, { req }) => {
    if (![0, 6, 12, 16, 18].includes(value)) {
      return false;
    }
    return true;
  }),
  body("budget", "should be numeric").isNumeric(),
  body("action", "action should be valid.").custom((value, { req }) => {
    if (!["kino", "serial", "multifilm"].includes(value)) {
      return false;
    }
    return true;
  }),
  body("payment", "payment should be valid.").custom((value, { req }) => {
    if (!["none", "pay"].includes(value)) {
      return false;
    }
    return true;
  }),
  body("originalLanguage", "originalLanguage should be valid.").custom(
    (value, { req }) => {
      if (![0, 1].includes(value)) {
        return false;
      }
      return true;
    }
  ),
  body("mistakes", "mistakes is required.").trim().not().isEmpty(),
];

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/movies");
  },
  filename: function (req, file, callback) {
    callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});

const fileUpload = multer({ storage: storage });

router.get("/", isAuth, moviesController.getAllMovies);

router.get("/:id", isAuth, moviesController.getMovie);

router.put(
  "/details/:id",
  isAdmin,
  detailValidator,
  moviesController.updateMovieDetails
);

router.put("/refs/:id", isAdmin, moviesController.updateMovieRef);

router.put(
  "/file/:id",
  isAdmin,
  fileUpload.array("image", 12),
  moviesController.updateMovieFiles
);

router.post(
  "/",
  isAdmin,
  fileUpload.array("image", 12),
  detailValidator,
  moviesController.createMovie
);

router.delete("/:id", isAdmin, moviesController.deleteMovie);

module.exports = router;
