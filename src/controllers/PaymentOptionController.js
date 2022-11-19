const PaymentOption = require("../models/paymentOption");

exports.getAll = async (req, res) => {
    try {
        const paymentOptions = await PaymentOption.find({ isActive: true });

        res.status(200).json({ message: "OK", success: true, description: "GET ALL PAYMENT OPTION SUCCESS", paymentOptions });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET ALL OPTION FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        const option = {
            name: req.body.name,
            description: req.body.description,
            index: req.body.index,
        };
        await PaymentOption.create(option);

        res.status(200).json({ message: "OK", success: true, description: "CREATE PAYMENT OPTION SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "CREATE PAYMENT OPTION FAILED" });
    }
};

exports.updateNumeric = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "UPDATE NUMERIC FAILED" });
    }
};
