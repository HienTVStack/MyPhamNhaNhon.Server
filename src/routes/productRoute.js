const express = require("express");
const Product = require("../models/Product");
const { body } = require("express-validator");
const ProductController = require("../controllers/ProductController");
const validate = require("../handlers/validation");
const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.get("/trash", ProductController.getTrash);
router.post(
    "/create",
    body("name").custom(async (value) => {
        return await Product.findOne({ name: value }).then((data) => {
            if (data) {
                return Promise.reject("Tên sản phẩm trùng");
            }
        });
    }),
    body("price").isNumeric().withMessage("Phải là số lớn hơn 0"),
    validate.validation,
    ProductController.create
);
router.get("/:slug/detail", ProductController.getBySlug);
router.put("/update", ProductController.update);
router.put("/updateImage", ProductController.updateImage);
router.post("/:id/destroy", ProductController.destroyById);
router.delete("/delete/:id", ProductController.forceDelete);
router.post("/deleted/multiple", ProductController.destroyMultiple);
router.post("/:id/restored", ProductController.restoredById);

module.exports = router;
