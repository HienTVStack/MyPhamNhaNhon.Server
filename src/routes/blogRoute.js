const express = require("express");
const { body } = require("express-validator");
const BlogController = require("../controllers/BlogController");
const Blog = require("../models/Blog");
const validate = require("../handlers/validation");
const router = express.Router();

router.get("/getAll", BlogController.getAll);
router.post(
    "/create",
    body("name").custom(async (value) => {
        return await Blog.findOne({ title: value }).then((blog) => {
            if (blog) {
                return Promise.reject(`Tên bài viết đã tồn tại`);
            }
        });
    }),
    validate.validation,
    BlogController.create
);

module.exports = router;
