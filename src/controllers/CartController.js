const Cart = require("../models/Cart");

exports.getByIdAuth = async (req, res) => {
    try {
        const cart = await Cart.findOne({ "customer.id": req.params.id });

        if (!cart) {
            return res.status(200).json({ message: "OK", cart: [] });
        }
        res.status(200).json({ message: "OK", cart: cart });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.addProductToCart = async (req, res) => {
    const { user, product } = req.body;

    try {
        const addProduct = await Cart.findOneAndUpdate({ "customer.id": user.id }, { $push: { products: product } });

        if (!addProduct) {
            const cartCreate = await Cart.create({ customer: user, products: product });
            return res.status(200).json({ message: "OK", cart: cartCreate });
        }

        res.status(200).json({ message: "OK", cart: addProduct });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};
