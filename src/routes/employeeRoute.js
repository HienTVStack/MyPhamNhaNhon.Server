const express = require("express");
const { body } = require("express-validator");

const Employee = require("../models/Auth");
const validate = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();

router.post(
    "/register",
    body("username").isLength({ min: 8 }).withMessage("Tên đăng nhập ít nhất là 8 kí tự"),
    body("password").isLength({ min: 8 }).withMessage("Mật khẩu ít nhất là 8 kí tự"),
    body("username").custom(async (value) => {
        return await Employee.findOne({ username: value }).then((emp) => {
            if (emp) {
                return Promise.reject("Tên đăng nhập đã được sử dụng");
            }
        });
    }),
    validate.validation,
    EmployeeController.register
);

router.post("/login", EmployeeController.login);
router.post("/verify-token", tokenHandler.verifyTokenEmp, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router;
