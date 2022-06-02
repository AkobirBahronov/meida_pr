const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    name: {
      uz: { type: String, required: [true, "Please fill up"] },
      ru: { type: String, required: [true, "Please fill up"] },
      en: { type: String, required: [true, "Please fill up"] },
    },
    description: {
      uz: { type: String, required: [true, "Please fill up"] },
      ru: { type: String, required: [true, "Please fill up"] },
      en: { type: String, required: [true, "Please fill up"] },
    },
    videoTime: {
      type: Number,
      required: [true, "Please fill up"],
    },
    files: [
      {
        type: String,
        required: [true, "Please fill up"],
      },
    ],
    rating: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    quality: {
      type: String,
      enum: ["360", "480", "HD", "FullHD", "UltraHD"],
      required: [true, "Please fill up"],
    },
    movies_ID: {
      type: Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("video", MySchema);
