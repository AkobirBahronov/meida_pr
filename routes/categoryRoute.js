const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");

const categoryController = require("../controllers/category.controller");

const router = express.Router();

router.get("/", isAuth, categoryController.getCategories);

router.get("/:id", isAuth, categoryController.getCategory);

router.put(
  "/:id",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  categoryController.updateCategory
);

router.post(
  "/",
  isAdmin,
  [
    body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
    body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
    body("name.en", "Name in en is required.").trim().not().isEmpty(),
  ],
  categoryController.createCategory
);

router.delete("/:id", isAdmin, categoryController.deleteCategory);

module.exports = router;
