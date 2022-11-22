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
        code: { type: String },
        discountPrice: { type: Number, default: 0 },
        customers: [
            {
                id: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
                fullName: { type: String, ref: "Auth" },
            },
        ],
        status: { type: Boolean, default: true },
        finishedAt: { type: Date },
    },
    schemaOptions
);

module.exports = mongoose.model("Discount", discountSchema);
