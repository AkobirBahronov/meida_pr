const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    name: {
      type: String,
      enum: ["bronze", "silver", "gold", "premium"],
      required: [true, "Please fill up"],
    },
    price: {
      type: Number,
      required: [true, "Please fill up"],
    },
    duration: {
      type: Number,
      enum: [1, 3, 6, 12],
      required: [true, "Please fill up"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("subscription", MySchema);
