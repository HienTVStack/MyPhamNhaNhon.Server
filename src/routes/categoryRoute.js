const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const Category = require("../models/Category");

router.get("/get-all", CategoryController.getAllCategory);
router.post(
    "/create",
    body("name").custom(async (value) => {
        return await Category.findOne({ name: name }).then((category) => {
            if (category) {
                Promise.reject(`Tên danh mục đã tồn tại`);
            }
        });
    }),
    CategoryController.createCategory
);

module.exports = router;
