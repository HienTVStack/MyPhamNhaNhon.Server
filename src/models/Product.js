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
    discountValue: { type: Number, default: 0 },
    image: { type: String, default: undefined },
    imageList: [{ type: String, default: undefined }],
    rating: { type: Number, default: 0 },
    numViews: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true },
    numSold: { type: Number, default: 0 },
    idSupplier: { type: String, ref: "supplier" },
    type: [
      {
        nameType: { type: String },
        price: { type: Number, default: 0 },
        salePrice: { type: Number, default: 0 },
        quantityStock: { type: Number, default: 0 },
      },
    ],
    category: [
      {
        id: { type: String },
        name: { type: String, ref: "Category" },
        slug: { type: String },
      },
    ],
    tags: [
      {
        name: { type: String, ref: "Tag" },
      },
    ],
    author: {
      fullName: { type: String, ref: "Auth" },
    },
    reviews: [
      {
        author: { type: String, default: undefined },
        content: { type: String, default: undefined },
        star: { type: Number, default: 0 },
        createdAt: { type: Date, default: new Date() },
        status: { type: String, default: true },
      },
    ],
    isSyncTiki: { type: Boolean, default: false },
  },
  schemaOptions
);

ProductSchema.plugin(MongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Product", ProductSchema);
