const express = require("express");
const multer = require("multer");
const md5 = require("md5");
const path = require("path");
const isAuth = require("../controllers/middleware/is-auth");
const isAdmin = require("../controllers/middleware/is-admin");
const trailerController = require("../controllers/trailer.controller");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads/trailers");
    },
    filename: function (req, file, callback) {
        callback(null, `${md5(Date.now())}${path.extname(file.originalname)}`);
    },
});

const fileUpload = multer({ storage: storage });

router.get("/movies/:movies_ID/trailers", isAuth, trailerController.getTrailers);

router.get("/:id", isAuth, trailerController.getTrailer);

router.put(
    "/:id",
    isAdmin,
    fileUpload.array("trailer", 12),
    trailerController.updateTrailer
);

router.post(
    "/",
    isAdmin,
    fileUpload.array("trailer", 12),
    trailerController.createTrailer
);

router.delete("/:id", isAdmin, trailerController.deleteTrailer);

module.exports = router;
