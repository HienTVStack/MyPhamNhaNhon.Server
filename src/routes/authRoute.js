const express = require("express");
const { body } = require("express-validator");

const User = require("../models/Auth");
const validate = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const AuthController = require("../controllers/AuthController");

const router = express.Router();

router.post(
    "/register",
    body("username").isLength({ min: 8 }).withMessage("Tên đăng nhập ít nhất là 8 kí tự"),
    body("password").isLength({ min: 8 }).withMessage("Mật khẩu ít nhất là 8 kí tự"),
    body("email").isEmail().withMessage("Vui lòng nhập email chính xác"),
    body("username").custom(async (value) => {
        return await User.findOne({ username: value }).then((user) => {
            if (user) {
                return Promise.reject("Tên đăng nhập đã được sử dụng");
            }
        });
    }),
    body("email").custom(async (value) => {
        return await User.findOne({ email: value }).then((user) => {
            if (user) {
                return Promise.reject(`E-mail này đã được sử dụng`);
            }
        });
    }),
    validate.validation,
    AuthController.register
);
router.post(
    "/isActive",
    body("userID").custom(async (value) => {
        return await User.findOne({ id: value }).then((user) => {
            if (!user) {
                return Promise.reject(`Vui lòng đăng ký tài khoản`);
            }
        });
    }),
    AuthController.isActive
);
router.post("/login", AuthController.login);
router.post("/login-google", AuthController.loginGoogle);
router.post("/login-facebook", AuthController.loginFacebook);
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    res.status(200).json({ user: req.user });
});
router.post("/forgot-password", body("email").isEmail().withMessage("Vui lòng nhập email chính xác"), AuthController.forgotPassword);
router.post("/update-password", body("password").isLength({ min: 8 }).withMessage(`Mật khẩu ít nhất là 8 kí tự`), AuthController.updatePassword);
router.put("/:id/updateInfo", AuthController.updateInfo);
router.put("/:id/addCart", AuthController.addCart);
router.put("/:id/removedCart", AuthController.removedCartItem);
//
router.get("/totalAccess", AuthController.totalAccess);

module.exports = router;
