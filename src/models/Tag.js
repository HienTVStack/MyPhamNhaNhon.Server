const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");
const slug = require("mongoose-slug-generator");

const tagSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        slug: { type: String, unique: true, slug: "name" },
    },
    schemaOptions
);

module.exports = mongoose.model("Tags", tagSchema);
