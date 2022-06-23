const express = require("express");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");
const reviewController = require("../controllers/review.controller");

const router = express.Router();

router.get("/", isAuth, reviewController.getReviews);

router.get("/:id", isAuth, reviewController.getReview);

router.put(
    "/:id",
    isAdmin,
    reviewController.updateReview
);

router.post(
    "/",
    isAuth,
    reviewController.createReview
);

router.delete("/:id", isAdmin, reviewController.deleteReview);

module.exports = router;
