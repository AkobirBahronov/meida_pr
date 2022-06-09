const DemoClass = require('../class/class');
const {
  callbackErrorJson,
  callbackSuccessJson,
} = require('../config/callback');
const RatingModel = require('../model/ratingModel');
const VideoModel = require('../model/videoModel');
const ObjectId = require('mongodb').ObjectId;

exports.getRatings = async (req, res, next) => {
  const result = new DemoClass(RatingModel, req, res, next);
  result.getAll();
};

exports.getRating = async (req, res, next) => {
  const result = new DemoClass(RatingModel, req, res, next);
  result.getOne();
};

exports.getRatingByUser = async (req, res, next) => {
  const result = await RatingModel.find({ user_ID: req.userId });
};

exports.createRating = async (req, res, next) => {
  try {
    const ratingObject = new RatingModel({
      ...req.body,
      status: ['views', 'history'],
    });

    const video_ID = req.body.video_ID;

    const ratings = await RatingModel.find({
      user_ID: req.userId,
      video_ID: video_ID,
    });

    if (ratings[0]) {
      throw new Error('You have already given rating to this video!');
    }

    await ratingObject.save().then(async () => {
      const allRating = await RatingModel.aggregate([
        {
          $match: {
            video_ID: ObjectId(video_ID),
          },
        },
        {
          $group: {
            _id: '$video_ID',
            count: { $sum: 1 },
            totalSum: { $sum: '$rating' },
          },
        },
        {
          $addFields: {
            average: {
              $round: [{ $divide: ['$totalSum', '$count'] }, 1],
            },
          },
        },
      ]);

      const updatedVideo = await VideoModel.findByIdAndUpdate(video_ID);
      updatedVideo.rating = allRating[0].average;
      const data = await updatedVideo.save();
      res.status(200).json(callbackSuccessJson(data, 'updated'));
    });
  } catch (err) {
    res.json(callbackErrorJson(err, err.message));
  }
};
