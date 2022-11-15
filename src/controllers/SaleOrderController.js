const SaleOrder = require("../models/SaleOrder");

exports.create = async (req, res) => {
    console.log(req.body);
    try {
        const saleOrder = await SaleOrder.create(req.body);

        res.status(200).json({ message: "OK", saleOrder });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", description: `Create invoice sale order fail` });
    }
};
