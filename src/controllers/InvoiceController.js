const Invoice = require("../models/Invoice");
const User = require("../models/Auth");
const Discount = require("../models/Discount");

exports.getAll = async (req, res) => {
    try {
        const invoices = await Invoice.find({});

        res.status(200).json({ message: "OK", success: true, description: "GET ALL INVOICE SUCCESS", invoices });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "GET ALL INVOICE FAILED" });
    }
};

exports.getByIdAuth = async (req, res) => {
    const { idAuth } = req.body;

    try {
        const invoice = await Invoice.findOne({ "auth.id": idAuth });

        if (invoice) {
            res.status(200).json({ message: "OK", success: true, description: "GET INVOICE SUCCESS", invoice });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "GET INVOICE FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        const response = await Invoice.create(req.body);
        console.log(response);
        if (response) {
            const idListRemove = [];
            req.body.products?.map((item) => {
                idListRemove.push(item.id);
            });
            const discountUpdate = Discount.updateOne({ code: req.body?.discount?.code }, { $pull: { customers: { id: req.body?.auth?.id } } });
            const userUpdate = User.updateMany({ id: req.body.auth.id }, { $pull: { carts: { id: { $in: idListRemove } } } });
            await Promise.all([discountUpdate, userUpdate]);
            res.status(200).json({ message: "OK", success: true, description: "CREATE INVOICE SUCCESS", invoice: response });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "CREATE INVOICE FAILED" });
    }
};
