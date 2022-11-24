const express = require("express");
const { body } = require("express-validator");
const DisCountController = require("../controllers/DiscountController");
const Discount = require("../models/Discount");
const validate = require("../handlers/validation");
const router = express.Router();

router.get("/getAll", DisCountController.getAll);
router.post(
    "/create",
    body("code").custom(async (value) => {
        return await Discount.findOne({ code: value }).then((discount) => {
            if (discount) {
                return Promise.reject(`Mã khuyến mãi đã được sử dụng`);
            }
        });
    }),
    validate.validation,
    DisCountController.create
);
router.post("/checkCodeByCustomer", DisCountController.checkCodeByCustomer);

module.exports = router;
