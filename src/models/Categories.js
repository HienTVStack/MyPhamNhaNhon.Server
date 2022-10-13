const mongoose = require("mongoose");
const modelOption = require("./modelOption");
const Schema = new mongoose.Schema();

mongoose.plugin(slug);

const categorySchema = Schema(
    {
        name: { type: String },
        slug: { type: String, unique: true, slug: "name" },
    },
    modelOption
);

module.exports = mongoose.model("Categories", categorySchema);
