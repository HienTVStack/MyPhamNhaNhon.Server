const SaleOrder = require("../models/SaleOrder");
const Product = require("../models/Product");

const totalPriceInvoiceSaleOrder = (products) => {
    let total = 0;
    products.map((item) => {
        total += item.total;
    });
    return total;
};

const amountProductInvoiceSaleOrder = (products) => {
    let amount = 0;
    products.map((item) => {
        amount += Number(item.quantity);
    });
    return amount;
};

exports.create = async (req, res) => {
    const _saleOrder = req.body;
    _saleOrder.total = totalPriceInvoiceSaleOrder(_saleOrder.products);
    _saleOrder.amount = amountProductInvoiceSaleOrder(_saleOrder.products);
    try {
        const saleOrder = await SaleOrder.create(_saleOrder);

        res.status(200).json({ message: "OK", saleOrder });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", description: `Create invoice sale order fail` });
    }
};

exports.getAll = async (req, res) => {
    console.log(`Get all`);
    try {
        const saleOrders = await SaleOrder.find({}).sort({ updatedAt: 1 });

        res.status(200).json({ message: "OK", success: true, description: "`GET ALL INVOICE SALE ORDER SUCCESS", saleOrders });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET ALL INVOICE SALE ORDER FAIL" });
    }
};

exports.getById = async (req, res) => {
    const { id } = req.params;

    try {
        const saleOrder = await SaleOrder.findById(id);

        res.status(200).json({ message: "OK", success: true, description: "GET BY ID INVOICE SALE ORDER SUCCESS", saleOrder });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET BY ID INVOICE SALE ORDER FAIL" });
    }
};

// Nhập hàng
exports.import = async (req, res) => {
    const { id } = req.params;

    const products = req.body.products;

    console.log(products);

    try {
        const invoice = await SaleOrder.findOneAndUpdate({ id }, { status: "SUCCESS", deliveryReal: req.body.deliveryReal || new Date() });
        if (!invoice) {
            res.status(404).json({ message: "FAIL", description: `IMPORT SALE ORDER FAILED`, success: false });
        }
        for (let item of products) {
            const product = await Product.findOne({ name: item.name });
            console.log(item);
            await Promise.all(
                product.type.map((typeItem) => {
                    if (typeItem.nameType === item.type) {
                        typeItem.quantityStock += Number(item.quantity);
                    }
                })
            );
            await product.save();
        }

        res.status(200).json({ message: "OK", success: true, description: `IMPORT SALE ORDER SUCCESS` });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", description: `IMPORT SALE ORDER FAILED`, success: false });
    }
};
