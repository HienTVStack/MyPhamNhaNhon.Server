const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const supplierSchema = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        phone: { type: String },
        address: { type: String },
    },
    schemaOptions
);

module.exports = mongoose.model("supplier", supplierSchema);
