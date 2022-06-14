const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    username: { type: String, required: [true, "Please fill up"] },
    speciality_ID: {
      type: Schema.Types.ObjectId,
      ref: "speciality",
      required: true,
    },
    files: [{ type: String, required: [true, "Please fill up"] }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("cast", MySchema);
