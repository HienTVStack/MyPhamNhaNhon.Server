const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const settingSchema = new mongoose.Schema(
    {
        shopName: { type: String, default: "" },
        phone: { type: String },
        address: { type: String },
        banners: [
            {
                imageUrl: { type: String },
                href: { type: String },
            },
        ],
        socials: {
            facebook: { type: String },
            instagram: { type: String },
            email: { type: String },
        },
    },
    schemaOptions
);

module.exports = mongoose.model("setting", settingSchema);
