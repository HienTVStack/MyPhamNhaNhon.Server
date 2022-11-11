const mongoose = require("mongoose");
const { schemaOptions } = require("./modelOption");

const employeeSchema = new mongoose.Schema(
    {
        username: { type: String, unique: true },
        password: { type: String },
        fullName: { type: String },
        email: { type: String },
        phoneNumber: { type: String, default: undefined },
        avatar: { type: String, default: "" },
        status: { type: Boolean, default: false },
    },
    schemaOptions
);

module.exports = mongoose.model("Employee", employeeSchema);
