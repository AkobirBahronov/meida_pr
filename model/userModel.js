const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    username: { type: String, required: [true, "Please fill up"] },
    email: { type: String, required: [true, "Please fill up"] },
    password: { type: String, required: [true, "Please fill up"] },
    status: {
      type: String,
      enum: ["none", "vip"],
      default: "none",
    },
    link: {
      telegram: [
        {
          type: String,
          required: true,
        },
      ],
      instagram: [
        {
          type: String,
          required: true,
        },
      ],
    },
    balance: {
      type: Number,
      default: 0,
    },
    uuid: {
      type: String,
      required: true,
    },
    subscriptionDeadline: {
      type: Number,
      default: 0,
    },
    files: [
      {
        type: String,
        required: true,
      },
    ],
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);
module.exports = model("user", MySchema);
