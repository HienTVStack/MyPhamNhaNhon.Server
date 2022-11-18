const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: { type: String },
        fullName: { type: String },
        email: { type: String },
        emailGoogle: { type: String },
        emailFacebook: { type: String },
        phoneNumber: { type: String, default: undefined },
        avatar: { type: String, default: "" },
        status: { type: Boolean, default: false },
        googleId: { type: String },
        facebookId: { type: String },
        codeConfirm: { type: Number },
        carts: [
            {
                id: { type: String},
                name: { type: String, ref: "products" },
                price: { type: Number },
                quantity: { type: Number },
                total: { type: String },
                image: { type: String },
                type: { type: String },
                createdAt: { type: Date, default: new Date() },
            },
        ],
    },
    schemaOptions
);

module.exports = mongoose.model("User", userSchema);
