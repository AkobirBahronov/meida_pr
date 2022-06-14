const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    video_ID: {
      type: Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("reply", MySchema);
