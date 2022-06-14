const DemoClass = require('../class/class');
const ObjectId = require('mongodb').ObjectId;

const { callbackSuccessJson } = require('../config/callback');
const { Comment, Like } = require('../models');

exports.getVideoComments = async (req, res, next) => {
  try {
    const videoId = req.params.videoId;
    const topComments = req.query.top_comments;
    let comments;
    if (topComments) {
      comments = await Comment.find({ video_ID: videoId }).sort({
        like: -1,
        _id: -1,
      });
    } else {
      comments = await Comment.find({ video_ID: videoId });
    }
    res.status(200).json(callbackSuccessJson(comments, 'received'));
  } catch (err) {
    console.log(err);
  }
};

exports.getUserComments = async (req, res, next) => {
  try {
    const topComments = req.query.top_comments;
    let comments;
    if (topComments) {
      comments = await Comment.find({ user_ID: req.userId }).sort({
        like: -1,
        _id: -1,
      });
    } else {
      comments = await Comment.find({ user_ID: req.userId });
    }
    res.status(200).json(callbackSuccessJson(comments, 'received'));
  } catch (err) {
    console.log(err);
  }
};

exports.createComment = async (req, res, next) => {
  const newReq = { ...req };
  newReq.body = {
    ...req.body,
    video_ID: req.params.videoId,
    user_ID: req.userId,
  };
  const result = new DemoClass(Comment, newReq, res, next);
  result.createData();
};

exports.editComment = async (req, res, next) => {
  const result = new DemoClass(Comment, req, res, next);
  result.updateDataDetails(req.userId);
};

exports.toggleTheLike = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndUpdate(commentId);
    const likes = await Like.findOne({
      user_ID: req.userId,
      comment_ID: commentId,
    });

    if (!likes) {
      comment.like++;
      await Like.create({
        user_ID: req.userId,
        comment_ID: commentId,
      });
    } else if (likes.status == 'dislike') {
      comment.like++;
      comment.dislike--;
      likes.status = 'like';
      await likes.save();
    } else if (likes.status == 'like') {
      comment.like--;
      await Like.deleteOne({
        user_ID: ObjectId(req.userId),
        comment_ID: ObjectId(commentId),
      });
    }

    const result = await comment.save();

    res.status(200).json(callbackSuccessJson(result, 'updated'));
  } catch (err) {
    console.log(err);
  }
};

exports.toggleTheDislike = async (req, res, next) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByIdAndUpdate(commentId);
    const dislikes = await Like.findOne({
      user_ID: req.userId,
      comment_ID: commentId,
    });

    if (!dislikes) {
      comment.dislike++;
      await Like.create({
        user_ID: req.userId,
        comment_ID: commentId,
        status: 'dislike',
      });
    } else if (dislikes.status == 'like') {
      comment.dislike++;
      comment.like--;
      dislikes.status = 'dislike';
      await dislikes.save();
    } else if (dislikes.status == 'dislike') {
      comment.dislike--;
      await Like.deleteOne({
        user_ID: ObjectId(req.userId),
        comment_ID: ObjectId(commentId),
      });
    }
    const result = await comment.save();

    res.status(200).json(callbackSuccessJson(result, 'updated'));
  } catch (err) {
    console.log(err);
  }
};
