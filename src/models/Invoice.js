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
        status: { type: Number, default: 0 }, // 0: Tạo mới - 1: Đang giao - 2. Thành công
        products: [
            {
                name: { type: String },
                type: { type: String },
                quantity: { type: Number },
                quantity: { type: String },
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
