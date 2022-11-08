const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const cartSchema = new mongoose.Schema(
    {
        customer: {
            id: { type: String, ref: "auth" },
            fullName: { type: String, ref: "auth" },
        },
        total: { type: Number, default: 0 },
        quantity: { type: Number, default: 0 },
        products: [
            {
                id: { type: String, ref: "product" },
                name: { type: String, ref: "product" },
                price: { type: Number },
                quantity: { type: Number, default: 0 },
                slug: { type: String, ref: "product" },
                image: { type: String, ref: "product" },
            },
        ],
    },
    schemaOptions
);

module.exports = mongoose.model("Cart", cartSchema);
