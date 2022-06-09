const VideoModel = require('../model/videoModel');
const ViewsModel = require('../model/viewsModel');
const callback = require('../config/callback');
const ObjectId = require('mongodb').ObjectId;

exports.toggleWatchLaterVideo = async (req, res, next) => {
  try {
    const views = await ViewsModel.findOneAndUpdate({
      user_ID: ObjectId(req.userId),
      video_ID: ObjectId(req.params.id),
    });
    const video = await VideoModel.findByIdAndUpdate(req.params.id);
    if (!views) {
      video.views++;
      const result = await video.save();
      await ViewsModel.create({
        user_ID: req.userId,
        status: ['views', 'history', 'watch-later'],
        video_ID: req.params.id,
      });
      res.json(callback.callbackSuccessJson(result, 'received'));
    } else if (!views.status.includes('watch-later')) {
      views.status = ['views', 'history', 'watch-later'];
      const result = await views.save();
      res.json(callback.callbackSuccessJson(result, 'received'));
    } else if (views.status.includes('watch-later')) {
      views.status = ['views', 'history'];
      const result = await views.save();
      res.json(callback.callbackSuccessJson(result, 'received'));
    }
  } catch (err) {
    res.json(callback.callbackErrorJson(err, 'error'));
  }
};

exports.deleteViewsHistory = async (req, res, next) => {
  try {
    const views = await ViewsModel.findOneAndUpdate({
      user_ID: ObjectId(req.userId),
      video_ID: ObjectId(req.params.id),
    });
    if (!views || !views.status.includes('history')) {
      throw new Error('This video was not watched!');
    } else if (views.status.includes('history')) {
      if (views.status.includes('watch-later')) {
        views.status = ['views', 'watch-later'];
      } else {
        views.status = ['views'];
      }
      const result = await views.save();
      res.json(callback.callbackSuccessJson(result, 'received'));
    }
  } catch (err) {}
};
