const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const { schemaOptions } = require("./modelOption");

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        slug: { type: String, unique: true, slug: "name" },
    },
    schemaOptions
);

module.exports = mongoose.model("Categories", categorySchema);
