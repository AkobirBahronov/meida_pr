const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    language_ID: {
      type: Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    movies_ID: {
      type: Schema.Types.ObjectId,
      ref: "movies",
      required: true,
    },
    files: { type: String, required: [true, "Please fill up"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("subtitle", MySchema);
