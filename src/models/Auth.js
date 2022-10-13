const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: { type: String },
        fullName: { type: String },
        email: { type: String },
        phoneNumber: { type: String, default: undefined },
        status: { type: Boolean, default: false },
        googleId: { type: String },
        facebookId: { type: String },
        codeConfirm: { type: Number },
    },
    schemaOptions
);

module.exports = mongoose.model("User", userSchema);
