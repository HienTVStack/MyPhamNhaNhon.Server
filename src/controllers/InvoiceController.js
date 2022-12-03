const Invoice = require("../models/Invoice");
const User = require("../models/Auth");
const paypal = require("paypal-rest-sdk");
const Discount = require("../models/Discount");
const Product = require("../models/Product");
const { isObjectId } = require("../handlers/validation");
const { handleSendEmailUpdateStatus } = require("../handlers/handleSendEmail.js");
const { findOneAndUpdate } = require("../models/Invoice");

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

exports.getListInvoiceAuth = async (req, res) => {
    const { id } = req.params;

    console.log(id);
    try {
        const invoices = await Invoice.find({ "auth.id": id }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, description: "GET LIST INVOICE OF AUTH SUCCESS", invoices: invoices });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "GET LIST INVOICE OF AUTH FAILED" });
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await Invoice.findOne({ _id: id });

        res.status(200).json({ message: "OK", success: true, invoice, description: "GET INVOICE BY ID SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: true, description: "GET INVOICE BY ID FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        const response = await Invoice.create(req.body);
        if (response) {
            const idListRemove = [];
            const productObjUpdate = [];
            req.body.products?.map((item) => {
                idListRemove.push(item.id);
                productObjUpdate.push({ idProduct: item.id, quantity: item.quantity, nameType: item.nameType, idType: item.idType });
            });
            await updateQuantityProduct(productObjUpdate);
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

const updateQuantityProduct = async (objList) => {
    try {
        for (const item of objList) {
            const product = await Product.findOne({ _id: item.idProduct });
            product?.type.map((typeItem) => {
                if (typeItem.nameType === item.nameType) {
                    typeItem.quantityStock -= item.quantity;
                }
            });
            product.numSold += item.quantity;
            await product.save();
        }
    } catch (error) {
        console.log(error);
    }
};

const handleUpdateStatusInvoice = async (idInvoice, numStatus) => {
    try {
        const invoice = await Invoice.findOneAndUpdate({ _id: idInvoice }, { status: numStatus });
        console.log(invoice);
        if (invoice) {
            const email = invoice?.auth?.email;
            console.log(email);
            email && handleSendEmailUpdateStatus(invoice?.auth.name, email, idInvoice);
        }
    } catch (error) {
        return false;
    }
};

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    try {
        switch (req.body.status) {
            case -1:
            case 0:
            case 1:
            case 2:
                // await Invoice.findOneAndUpdate({ _id: id }, { status: req.body.status });
                handleUpdateStatusInvoice(id, req.body.status);
                return res.status(200).json({ message: "OK", success: true, description: "UPDATE STATUS INVOICE SUCCESS" });
            default:
                await Invoice.findOneAndUpdate({ _id: id }, { status: 3 });
                return res.status(200).json({ message: "OK", success: false, description: "UPDATE STATUS INVOICE SUCCESS" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAILED", success: false, description: "UPDATE STATUS INVOICE FAILED" });
    }
};

exports.paypal = async (req, res) => {
    var create_payment_json = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://return.url",
            cancel_url: "http://cancel.url",
        },
        transactions: [
            {
                item_list: {
                    items: [
                        {
                            name: "item",
                            sku: "item",
                            price: "1.00",
                            currency: "USD",
                            quantity: 1,
                        },
                    ],
                },
                amount: {
                    currency: "USD",
                    total: "1.00",
                },
                description: "This is the payment description.",
            },
        ],
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
};
