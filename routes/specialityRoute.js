const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");

const specialityController = require("../controllers/speciality.controller");

const router = express.Router();

router.get("/", isAuth, specialityController.getSpecialities);

router.get("/:id", isAuth, specialityController.getSpeciality);

router.put(
  "/:id",
  isAdmin,
  [body("name", "Name is required.").trim().not().isEmpty()],
  specialityController.updateSpeciality
);

router.post(
  "/",
  isAdmin,
  [body("name", "Name is required.").trim().not().isEmpty()],
  specialityController.createSpeciality
);

router.delete("/:id", isAdmin, specialityController.deleteSpeciality);

module.exports = router;
