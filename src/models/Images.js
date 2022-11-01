const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const imageSchema = new mongoose.Schema(
    {
        title: { type: String, default: undefined },
        caption: { type: String, default: "" },
        description: { type: String, default: "" },
        fileUrl: { type: String, require: true },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
        },
    },
    schemaOptions
);

module.exports = mongoose.model("Image", imageSchema);
