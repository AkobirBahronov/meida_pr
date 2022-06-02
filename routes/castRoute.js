const express = require("express");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const castController = require("../controller/castController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/cast");
  },
  filename: function (req, file, callback) {
    callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});

const fileUpload = multer({ storage: storage });

router.get("/", isAuth, castController.getCasts);

router.get("/:id", isAuth, castController.getCast);

router.put(
  "/details/:id",
  isAdmin,
  [body("username", "username is required.").trim().not().isEmpty()],
  castController.updateCastDetails
);

router.put(
  "/file/:id",
  isAdmin,
  fileUpload.array("image", 1),
  castController.updateCastPhoto
);

router.post(
  "/",
  isAdmin,
  fileUpload.array("image", 1),
  [body("username", "username is required.").trim().not().isEmpty()],
  castController.createCast
);

router.delete("/:id", isAdmin, castController.deleteCast);

module.exports = router;
