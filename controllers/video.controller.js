const DemoClass = require('../class/class');
const callback = require('../config/callback');
const { Video, Views } = require('../models');

exports.getAllVideos = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.fetchAndCache("video");
};

exports.watchVideo = async (req, res, next) => {
  try {
    const views = await Views.find({
      user_ID: req.userId,
      video_ID: req.params.id,
    });
    const video = await Video.findByIdAndUpdate(req.params.id);
    if (!views[0]) {
      video.views++;
      const result = await video.save();
      await Views.create({
        user_ID: req.userId,
        status: ['views', 'history'],
        video_ID: req.params.id,
      });
      res.json(callback.callbackSuccessJson(result, 'received'));
    } else {
      res.json(callback.callbackSuccessJson(video, 'received'));
    }
  } catch (err) {
    res.json(callback.callbackErrorJson(err, 'error'));
  }
};

exports.createVideo = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.createDataWithFile();
};

exports.updateVideoDetails = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.updateDataDetails();
};

exports.updateVideoRef = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.updateDataDetails();
};

exports.updateVideoFiles = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.updateDataFiles('video');
};

exports.deleteVideo = async (req, res, next) => {
  const result = new DemoClass(Video, req, res, next);
  result.deleteDataWithFiles('video');
};
