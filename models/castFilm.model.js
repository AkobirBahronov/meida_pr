const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    cast_ID: {
      type: Schema.Types.ObjectId,
      ref: "cast",
      required: true,
      index: true,
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

module.exports = model("cast_film", MySchema);
