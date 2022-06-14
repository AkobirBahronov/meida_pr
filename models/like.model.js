const { model, Schema } = require('mongoose');

const MySchema = Schema(
  {
    comment_ID: {
      type: Schema.Types.ObjectId,
      ref: 'comment',
      required: true,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['like', 'dislike'],
      default: 'like',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('like', MySchema);
