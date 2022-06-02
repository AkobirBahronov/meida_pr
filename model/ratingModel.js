const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    movies_ID: {
      type: Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    status: {
      type: String,
      enum: ["views", "history", "watch-later"],
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    directingRating: { type: Number, default: 0 },
    entertainmentRating: { type: Number, default: 0 },
    plotRating: { type: Number, default: 0 },
    actorsRating: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = model("rating", MySchema);
