const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const paymentOptionSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, unique: true },
        description: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
        image: { type: String, default: "" },
        index: { type: Number },
    },
    schemaOptions
);

module.exports = mongoose.model("PaymentOptions", paymentOptionSchema);
