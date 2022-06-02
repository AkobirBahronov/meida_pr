const DemoClass = require("../class/class");
const RatingModel = require("../model/ratingModel");

exports.getRatings = async (req, res, next) => {
  const result = new DemoClass(RatingModel, req, res, next);
  result.getAll();
};

exports.getRatingByUser = async (req, res, next) => {
  const result = await RatingModel.find({ user_ID: req.userId }).populate(
    "movies"
  );
};
