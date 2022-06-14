const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    language_ID: {
      type: Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    video_ID: {
      type: Schema.Types.ObjectId,
      ref: "video",
      required: true,
    },
    files: { type: String, required: [true, "Please fill up"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("subtitle", MySchema);
