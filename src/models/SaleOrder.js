const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const SaleOrderSchema = new mongoose.Schema(
    {
        fromOrder: {
            name: { type: String, require: true },
            address: { type: String, require: true },
            phone: { type: String, require: true },
        },
        toOrder: {
            name: { type: String, require: true },
            address: { type: String, require: true },
            phone: { type: String, require: true },
        },
        status: { type: String, default: "Draft" },
        createdDate: { type: Date, require: true, default: new Date() },
        dueDate: { type: Date, require: true },
        products: [
            {
                name: { type: String, ref: "products" },
                price: { type: Number, require: true },
                quantity: { type: Number, require: true },
                total: { type: Number, require: true },
                category: [
                    {
                        name: { type: String },
                    },
                ],
                type: { type: String },
            },
        ],
        description: { type: String, default: "" },
        createdBy: { type: String },
    },
    schemaOptions
);

module.exports = mongoose.model("SaleOrder", SaleOrderSchema);
