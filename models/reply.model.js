const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    comment_ID: {
      type: Schema.Types.ObjectId,
      ref: "comment",
      required: true,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: { type: String, required: true },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("reply", MySchema);
