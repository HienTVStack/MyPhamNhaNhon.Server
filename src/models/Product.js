const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");
const slug = require("mongoose-slug-generator");
const MongooseDelete = require("mongoose-delete");

mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, unique: true, required: true },
        slug: { type: String, slug: "name", unique: true },
        descriptionContent: { type: String, default: `Chưa có mô tả nào` },
        detailContent: { type: String, default: `Chưa có mô tả nào` },
        price: { type: Number, required: true, default: 0 },
        quantityStock: { type: Number, default: 0 },
        image: { type: String, default: undefined },
        imageList: [{ type: String, default: undefined }],
        rating: { type: Number, default: 0 },
        numberViews: { type: Number, default: 0 },
        inStock: { type: Boolean, default: false },
        category: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Category",
            },
        ],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Auth",
        },
    },
    schemaOptions
);

ProductSchema.plugin(MongooseDelete, {
    deletedAt: true,
    deletedBy: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Product", ProductSchema);
