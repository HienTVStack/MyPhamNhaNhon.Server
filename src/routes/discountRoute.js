const express = require("express");
const { body } = require("express-validator");
const DisCountController = require("../controllers/DiscountController");
const router = express.Router();

router.get("/getAll", DisCountController.getAll);
router.post("/create", DisCountController.create);
router.post("/checkCodeByCustomer", DisCountController.checkCodeByCustomer);

module.exports = router;
