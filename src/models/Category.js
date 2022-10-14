const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const modelOption = require("./modelOption");

mongoose.plugin(slug);

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, unique: true },
        slug: { type: String, unique: true, slug: "name" },
    },
    modelOption
);

module.exports = mongoose.model("Categories", categorySchema);
