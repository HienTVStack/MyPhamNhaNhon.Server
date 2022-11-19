const express = require("express");
const PaymentOptionController = require("../controllers/PaymentOptionController");
const router = express.Router();

router.get("/getAll", PaymentOptionController.getAll);
router.post("/create", PaymentOptionController.create);

module.exports = router;
