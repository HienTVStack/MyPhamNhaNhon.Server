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
        let voucher = null;
        const today = new Date();
        await Discount.findOne({ code: req.body.code })
            .then((res) => {
                res?.customers?.map((item) => {
                    if (item.id === req.body.idUser) {
                        if (today.getTime() >= res.startedAt.getTime() && today.getTime() <= res.finishedAt.getTime()) {
                            isCheck = true;
                            voucher = {
                                discountValue: res?.discountValue,
                                invoiceMin: res?.invoiceMin,
                                startedAt: res?.startedAt,
                                finishedAt: res?.finishedAt,
                                discountValueMax: res?.discountValueMax,
                            };
                        }
                    }
                });
            })
            .catch((err) => {
                console.log(err);
                isCheck = false;
            });
        res.status(200).json({ message: "OK", description: "CHECK VOUCHER SUCCESS", success: true, isCheck, voucher });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "CHECK VOUCHER FAILED" });
    }
};
