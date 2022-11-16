const Auth = require("../models/Auth");
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
        const cartFindProduct = await Cart.findOne({ "products.id": product.id });
        if (cartFindProduct) {
            let a = 0;
            cartFindProduct.products.map((tmp) => {
                if (tmp.id === product.id) {
                    a = tmp.quantity + product.quantity;
                }
            });
            await Cart.updateOne({ "customer.id": user.id, "products.id": product.id }, { $set: { "products.$.quantity": a } });
            return res.status(200).json({ message: "OK" });
        }
        const addProduct = await Cart.findOneAndUpdate({ "customer.id": user.id }, { $push: { products: product } });

        if (!addProduct) {
            const cartCreate = await Cart.create({ customer: user, products: product });
            return res.status(200).json({ message: "OK", cart: cartCreate });
        }

        res.status(200).json({ message: "OK", cart: addProduct });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", error });
    }
};

// exports.addCartItem = async (req, res) => {
//     const {id, cartItem} = req.body;
//     try {
//         const cart = await Auth.findByIdAndUpdate({i}, {carts: cartItem})
//     } catch (error) {
//         res.status(404).json({message: 'FAIL', success: false, description: 'ADD CART ITEM FAILED'})
//     }
// }
