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
        enum: ["ratings", "history"],
      },
    ],
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    directingRating: { type: Boolean, default: false },
    entertainmentRating: { type: Boolean, default: false },
    plotRating: { type: Boolean, default: false },
    actorsRating: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model("rating", MySchema);
