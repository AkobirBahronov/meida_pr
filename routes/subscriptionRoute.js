const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const subscriptionController = require("../controller/subscriptionController");

const router = express.Router();

router.get("/", isAuth, subscriptionController.getAllSubscriptions);

router.get("/:id", isAuth, subscriptionController.getSubscription);

router.patch("/:id", isAuth, subscriptionController.buySubscription);

router.put(
  "/:id",
  isAdmin,
  [
    body("name", "name is required.").custom((value, { req }) => {
      if (!["bronze", "silver", "gold"].includes(value)) {
        return false;
      }
      return true;
    }),
    body("price", "price should be numeric.").isNumeric(),
    body("duration", "duration should be valid!")
      .isNumeric()
      .custom((value, { req }) => {
        if (![1, 3, 6, 12].includes(value)) {
          return false;
        }
        return true;
      }),
  ],
  subscriptionController.updateSubscription
);

router.post(
  "/",
  isAdmin,
  [
    body("name", "name should be valid.").custom((value, { req }) => {
      if (!["bronze", "silver", "gold", "premium"].includes(value)) {
        return false;
      }
      return true;
    }),
    body("price", "price should be numeric.").isNumeric(),
    body("duration", "duration should be valid!").custom((value, { req }) => {
      if (![1, 3, 6, 12].includes(value)) {
        return false;
      }
      return true;
    }),
  ],
  subscriptionController.createSubscription
);

router.delete("/:id", isAdmin, subscriptionController.deleteSubscription);

module.exports = router;
