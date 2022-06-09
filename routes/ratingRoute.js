const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");

const ratingController = require("../controller/ratingController");

const router = express.Router();

router.get("/", isAuth, ratingController.getRatings);

router.get("/forUser", isAuth, ratingController.getRatingByUser);

router.get("/:id", isAuth, ratingController.getRating);

router.post(
  "/",
  isAuth,
  [
    body("rating", "rating should be valid").custom((value, { req }) => {
      if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(value)) {
        return false;
      }
      return true;
    }),
  ],
  ratingController.createRating
);

module.exports = router;
