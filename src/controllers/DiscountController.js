const { isObjectId } = require("../handlers/validation");
const Discount = require("../models/Discount");

exports.getAll = async (req, res) => {
    try {
        const discounts = await Discount.find({}).sort({ createdAt: 1 });

        res.status(200).json({ message: "OK", success: true, description: "GET ALL DISCOUNT LIST SUCCESS", discounts: discounts });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET ALL DISCOUNT LIST FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        const discount = await Discount.create(req.body);

        res.status(200).json({ message: "OK", success: true, description: "CREATE SUCCESS", discount });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "CREATE DISCOUNT FAILED" });
    }
};

exports.checkCodeByCustomer = async (req, res) => {
    try {
        let isCheck = false;
        let discountValue = 0;
        let voucher = null;
        await Discount.findOne({ code: req.body.code })
            .then((res) => {
                res?.customers?.map((item) => {
                    if (item.id === req.body.idUser) {
                        isCheck = true;
                        discountValue = res?.discountValue;
                        voucher = res;
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                isCheck = false;
            });
        res.status(200).json({ message: "OK", description: "CHECK VOUCHER SUCCESS", success: true, isCheck, discountValue: discountValue, voucher });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "CHECK VOUCHER FAILED" });
    }
};
