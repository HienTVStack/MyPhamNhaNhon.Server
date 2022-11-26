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
        await Discount.findOne({ code: req.body.code, type: 1, status: true })
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
// Giảm giá trên tổng hóa đơn
exports.checkTotalInvoiceVerifyDiscount = async (req, res) => {
    const { totalInvoice } = req.body;
    const discountArr = [];
    const today = new Date();

    try {
        await Discount.find({
            status: true,
            type: 2,
            invoiceMin: { $lte: Number(totalInvoice) },
            startedAt: { $lte: new Date(today) },
            finishedAt: { $gt: new Date(today) },
        })
            .then((discounts) => {
                return res.status(200).json({
                    message: "OK",
                    success: true,
                    description: "CHECK DISCOUNT WITH TOTAL INVOICE SUCCESS",
                    discount: discounts[0],
                });
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "CHECK DISCOUNT WITH TOTAL INVOICE FAILED" });
    }
};
