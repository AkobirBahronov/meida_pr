const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    video_ID: {
      type: Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    status: [
      {
        type: String,
        enum: ["views", "history", "watch-later"],
      },
    ],
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("view", MySchema);
