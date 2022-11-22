const Discount = require("../models/Discount");

exports.getAll = async (req, res) => {
    try {
        const discounts = await Discount.find({}).sort({ createdAt: 1 });

        res.status(200).json({ message: "OK", description: "GET ALL DISCOUNT LIST SUCCESS", discounts: discounts });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET ALL DISCOUNT LIST FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        const discount = await Discount.create(req.body);

        res.status(200).json({ message: "OK", description: "CREATE SUCCESS", discount });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "CREATE DISCOUNT FAILED" });
    }
};
