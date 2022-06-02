const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");

const userController = require("../controller/userController");
const isAuth = require("../middleware/is-auth");
const UserModel = require("../model/userModel");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/user");
  },
  filename: function (req, file, callback) {
    callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});

const fileUpload = multer({ storage: storage });

router.get("/user-details", isAuth, userController.getLoggedUserDetail);

router.get("/users", isAdmin, userController.getUsers);

router.post(
  "/signup",
  fileUpload.array("image", 1),
  [
    body("email", "Please enter a valid email.")
      .isEmail()
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .normalizeEmail(),
    body("password", "password length should be at least 5 characters")
      .trim()
      .isLength({ min: 5 }),
    body("username", "username is required").trim().not().isEmpty(),
    body("link.telegram", "telegram link is required").trim().not().isEmpty(),
    body("link.instagram", "instagram link is required").trim().not().isEmpty(),
  ],
  userController.signUp
);

router.put(
  "/update-detail",
  isAuth,
  [
    body("email", "Please enter a valid email.")
      .isEmail()
      .custom((value, { req }) => {
        return UserModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject("E-mail already in use");
          }
        });
      })
      .normalizeEmail(),
    body("password", "password length should be at least 5 characters")
      .trim()
      .isLength({ min: 5 }),
    body("username", "username is required").trim().not().isEmpty(),
    body("link.telegram", "telegram link is required").trim().not().isEmpty(),
    body("link.instagram", "instagram link is required").trim().not().isEmpty(),
  ],
  userController.updateUserDetails
);
router.put(
  "/update-image",
  isAuth,
  fileUpload.array("image", 1),
  userController.updateUserPhoto
);

router.post("/login", userController.login);

router.put("/reset-password", userController.postNewPassword);

router.post(
  "/password-change-request",
  userController.postPasswordResetRequest
);
router.delete("/delete", isAuth, userController.deleteUserItself);
router.delete("/delete/:id", isAdmin, userController.deleteUserByAdmin);

module.exports = router;
