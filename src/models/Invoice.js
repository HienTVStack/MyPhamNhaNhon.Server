const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const InvoiceSchema = new mongoose.Schema(
    {
        auth: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Auth", require: true },
            name: { type: String },
            address: { type: String },
            phone: { type: String },
        },
        status: { type: Boolean, default: true },
        products: [
            {
                name: { type: String },
                type: { type: String },
                quantity: { type: Number },
                quantity: { type: String },
                image: { type: String },
            },
        ],
        total: { type: String },
        discount: {
            discountText: { type: String },
            discount: { type: Number },
        },
        priceDelivery: { type: Number },
        paymentOption: { type: String },
    },
    schemaOptions
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
