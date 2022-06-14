const { model, Schema } = require("mongoose");

const MySchema = Schema(
  {
    name: {
      uz: { type: String, required: [true, "Please fill up"] },
      ru: { type: String, required: [true, "Please fill up"] },
      en: { type: String, required: [true, "Please fill up"] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("genre", MySchema);
