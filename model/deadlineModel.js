const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    subscription_ID: {
      type: Schema.Types.ObjectId,
      ref: "subscription",
      required: true,
    },
    deadline: {
      type: Date,
      required: [true, "Please fill up"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("deadline", MySchema);
