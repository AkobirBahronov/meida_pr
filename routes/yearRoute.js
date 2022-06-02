const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const yearController = require("../controller/yearController");

const router = express.Router();

router.get("/", isAuth, yearController.getYears);

router.get("/:id", isAuth, yearController.getYear);

router.put(
  "/:id",
  isAdmin,
  [body("name", "Name is required.").trim().not().isEmpty()],
  yearController.updateYear
);

router.post(
  "/",
  isAdmin,
  [body("name", "Name is required.").trim().not().isEmpty()],
  yearController.createYear
);

router.delete("/:id", isAdmin, yearController.deleteYear);

module.exports = router;
