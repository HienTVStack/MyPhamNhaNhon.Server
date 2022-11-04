const express = require("express");
const { body } = require("express-validator");
const route = express.Router();
const validate = require("../handlers/validation");
const TagController = require("../controllers/TagController");
const Tag = require("../models/Tag");

route.get("/getAll", TagController.getAll);
route.post(
    "/create",
    body("name").custom(async (value) => {
        return await Tag.findOne({ name: value }).then((data) => {
            if (data) {
                return Promise.reject("Thẻ đã tồn tại");
            }
        });
    }),
    validate.validation,
    TagController.create
);

module.exports = route;
