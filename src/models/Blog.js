const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const MongooseDelete = require("mongoose-delete");
const { schemaOptions } = require("./modelOption");

mongoose.plugin(slug);

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        slug: { type: String, slug: "title", unique: true },
        description: { type: String, default: null },
        content: { type: String, default: null },
        metaTitle: { type: String },
        metaDescription: { type: String },
        image: { type: String, require: true },
        isPublic: { type: Boolean, default: true },
        isReview: { type: Boolean, default: true },
        view: { type: String, default: 0 },
        tags: [
            {
                name: { type: String, ref: "Tag" },
            },
        ],
        review: [
            {
                author: { type: String },
                content: { type: String },
                star: { type: Number },
                createdAt: { type: Date },
                status: { type: String },
            },
        ],
        author: [
            {
                name: { type: String, ref: "Auth" },
            },
        ],
    },
    schemaOptions
);

BlogSchema.plugin(MongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Blog", BlogSchema);
