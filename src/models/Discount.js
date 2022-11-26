const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const discountSchema = new mongoose.Schema(
    {
        employee: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
            fullName: { type: String, ref: "Employee" },
        },
        name: { type: String },
        description: { type: String },
        code: { type: String, unique: true },
        type: { type: Number, require: -1 }, // 1. Voucher 2. Giảm giá trên hóa đơn -1.Lỗi
        discountValue: { type: Number, default: 0 },
        discountValueMax: { type: Number },
        invoiceMin: { type: Number, default: 0 },
        isAll: { type: Boolean },
        customers: [
            {
                id: { type: String, ref: "Auth" },
                fullName: { type: String, ref: "Auth" },
            },
        ],
        status: { type: Boolean, default: true },
        startedAt: { type: Date, require: true },
        finishedAt: { type: Date, require: true },
    },
    schemaOptions
);

module.exports = mongoose.model("Discount", discountSchema);
