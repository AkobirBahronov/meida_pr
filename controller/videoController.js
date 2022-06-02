const DemoClass = require("../class/class");
const VideoModel = require("../model/videoModel");
const ViewsModel = require("../model/viewsModel");

exports.getAllVideos = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.getAll();
};

exports.watchVideo = async (req, res, next) => {
  try {
    const views = await ViewsModel.find({ user_ID: req.userId });
    const video = await VideoModel.findByIdAndUpdate(req.params.id);
    if (!views) {
      video.views++;
      const result = await video.save();
      res.json(callback.callbackSuccessJson(result, "received"));
    } else {
      res.json(callback.callbackSuccessJson(video, "received"));
    }
  } catch (err) {
    res.json(callback.callbackErrorJson(error, "error"));
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
  result.updateDataFiles("public/uploads/video");
};

exports.deleteVideo = async (req, res, next) => {
  const result = new DemoClass(VideoModel, req, res, next);
  result.deleteDataWithFiles("public/uploads/video");
};
