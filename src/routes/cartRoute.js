const express = require("express");
const CartController = require("../controllers/CartController");
const router = express.Router();

router.get("/auth/:id", CartController.getByIdAuth);
router.put("/addProduct", CartController.addProductToCart);

module.exports = router;
