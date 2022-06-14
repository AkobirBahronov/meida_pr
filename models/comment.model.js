const { model, Schema } = require('mongoose');

const MySchema = Schema(
  {
    user_ID: {
      type: Schema.ObjectId,
      ref: 'user',
      required: [true, 'Please fill up'],
    },
    video_ID: {
      type: Schema.ObjectId,
      ref: 'video',
      required: [true, 'Please fill up'],
    },
    message: { type: String, required: [true, 'Please fill up'] },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model('comment', MySchema);
