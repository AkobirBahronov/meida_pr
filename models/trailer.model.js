const { model, Schema } = require("mongoose");

const MySchema = Schema(
    {
        files: [
            {
                type: String,
                required: [true, "Please fill up"],
            },
        ],
        movies_ID: {
            type: Schema.Types.ObjectId,
            ref: "movies",
            required: true,
            index: true
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("trailer", MySchema);
