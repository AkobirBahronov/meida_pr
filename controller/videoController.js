const DemoClass = require('../class/class');
const VideoModel = require('../model/videoModel');
const ViewsModel = require('../model/viewsModel');
const callback = require('../config/callback');

exports.getAllVideos = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.getAll();
};

exports.watchVideo = async (req, res, next) => {
  try {
    const views = await ViewsModel.find({
      user_ID: req.userId,
      video_ID: req.params.id,
    });
    const video = await VideoModel.findByIdAndUpdate(req.params.id);
    if (!views[0]) {
      video.views++;
      const result = await video.save();
      await ViewsModel.create({
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
  const result = new DemoClass(VideoModel, req, res, next);
  result.createDataWithFile();
};

exports.updateVideoDetails = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.updateDataDetails();
};

exports.updateVideoRef = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.updateDataDetails();
};

exports.updateVideoFiles = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.updateDataFiles('video');
};

exports.deleteVideo = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.deleteDataWithFiles('video');
};
