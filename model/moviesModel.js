const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    category_ID: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    year_ID: {
      type: Schema.Types.ObjectId,
      ref: "year",
      required: true,
    },
    language_ID: {
      type: Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    cast_ID: {
      type: Schema.Types.ObjectId,
      ref: "cast",
      required: true,
    },
    director_ID: {
      type: Schema.Types.ObjectId,
      ref: "cast",
      required: true,
    },
    country_ID: {
      type: Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    genre_ID: {
      type: Schema.Types.ObjectId,
      ref: "genre",
      required: true,
    },
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
    age: {
      type: Number,
      enum: [0, 6, 12, 16, 18],
      required: [true, "Please fill up"],
    },
    files: [
      {
        type: String,
        required: [true, "Please fill up"],
      },
    ],
    rating: { type: Number, default: 0 },
    budget: { type: String, required: [true, "Please fill up"] },
    action: {
      type: String,
      enum: ["kino", "serial", "multifilm"],
      required: [true, "Please fill up"],
    },
    payment: {
      type: String,
      enum: ["none", "pay"],
      required: [true, "Please fill up"],
    },
    originalLanguage: {
      type: Number,
      enum: [0, 1],
      required: [true, "Please fill up"],
    },
    mistakes: [{ type: String, required: [true, "Please fill up"] }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("movies", MySchema);
