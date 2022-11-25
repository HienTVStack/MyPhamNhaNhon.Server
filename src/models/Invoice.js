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
        status: { type: Number, default: 0 }, // 0 tao moi, 1. giao hang, 2 thanh cong, 3 loi, -1 huy
        products: [
            {
                name: { type: String },
                type: { type: String },
                quantity: { type: Number },
                price: { type: Number },
                image: { type: String },
            },
        ],
        total: { type: Number },
        discount: {
            code: { type: String },
            discountValue: { type: Number },
        },
        priceDelivery: { type: Number },
        paymentOption: { type: String },
        deliveryAt: { type: String },
        employeeConfirm: {
            id: { type: String, ref: "Employee" },
            fullName: { type: String },
        },
        // employeeDelivery:
    },
    schemaOptions
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
