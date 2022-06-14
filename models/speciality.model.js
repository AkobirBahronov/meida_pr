const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    name: { type: String, required: [true, "Please fill up"] },
  },
  {
    timestamps: true,
  }
);

module.exports = model("speciality", MySchema);
