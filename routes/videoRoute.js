const express = require("express");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const { body } = require("express-validator");
const isAuth = require("../middleware/is-auth");
const isAdmin = require("../middleware/is-admin");
const videoController = require("../controller/videoController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads/video");
  },
  filename: function (req, file, callback) {
    callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
  },
});

const detailValidator = [
  body("name.uz", "Name in uz is required.").trim().not().isEmpty(),
  body("name.ru", "Name in ru is required.").trim().not().isEmpty(),
  body("name.en", "Name in en is required.").trim().not().isEmpty(),
  body("description.uz", "DescriptionUz is required.").trim().not().isEmpty(),
  body("description.ru", "DescriptionRu is required.").trim().not().isEmpty(),
  body("description.en", "DescriptionEn is required.").trim().not().isEmpty(),
  body("videoTime", "videoTime should be numeric.").isNumeric(),
  body("quality", "quality should be valid.").custom((value, { req }) => {
    if (!["360", "480", "HD", "FullHD", "UltraHD"].includes(value)) {
      return false;
    }
    return true;
  }),
];

const fileUpload = multer({ storage: storage });

router.get("/", isAuth, videoController.getAllVideos);

router.patch("/:id", isAuth, videoController.watchVideo);

router.put(
  "/details/:id",
  isAdmin,
  detailValidator,
  videoController.updateVideoDetails
);

router.put("/refs/:id", isAdmin, videoController.updateVideoRef);

router.put(
  "/file/:id",
  isAdmin,
  fileUpload.array("video_image", 12),
  videoController.updateVideoFiles
);

router.post(
  "/",
  isAdmin,
  fileUpload.array("video_image", 12),
  detailValidator,
  videoController.createVideo
);

router.delete("/:id", isAdmin, videoController.deleteVideo);

module.exports = router;
