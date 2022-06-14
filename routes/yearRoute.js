const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");
const yearController = require("../controllers/year.controller");

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
