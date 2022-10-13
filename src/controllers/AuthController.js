const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const handleSendEmail = require("../handlers/handleSendEmail");
const User = require("../models/Auth");
const { htmlVerifyEmail } = require("../html/verifyEmail");

exports.register = async (req, res) => {
    const { password } = req.body;

    try {
        req.body.password = CryptoJS.AES.encrypt(
            password,
            process.env.PASSWORD_SECRET_KEY
        );

        const user = await User.create(req.body);

        let transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: req.body.email,
            subject: `${process.env.NAME_SHOP} - XÁC NHẬN ĐĂNG KÝ TÀI KHOẢN `,
            html: htmlVerifyEmail(req.body.fullName, user.codeConfirm),
        };

        transport.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(`Don't send email to ${req.body.fullName}`);
            }
        });

        res.status(201).json({ user });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select(
            "password username"
        );
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "username",
                        msg: `Tên đăng nhập hoặc mật khẩu không chính xác`,
                    },
                ],
            });
        }

        const decryptedPass = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if (decryptedPass !== password) {
            return res.status(401).json({
                errors: [
                    {
                        param: "password",
                        msg: "Tên đăng nhập hoặc mật khẩu không chính xác",
                    },
                ],
            });
        }

        user.password = undefined;

        const token = jsonwebtoken.sign(
            { id: user._id },
            process.env.TOKEN_SELECT_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.loginGoogle = async (req, res) => {
    try {
        const { id, name, email } = req.body;
        const user = await User.findOne({ googleId: id });

        if (user) {
            const token = jsonwebtoken.sign(
                { id: user.id },
                process.env.TOKEN_SELECT_KEY,
                { expiresIn: "24h" }
            );
            return res.status(200).json({ user, token });
        } else {
            const userRegister = await User.create({
                username: id,
                email,
                fullName: name,
                googleId: id,
                status: true,
            });
            const token = jsonwebtoken.sign(
                { id: userRegister._id },
                process.env.TOKEN_SELECT_KEY,
                { expiresIn: "24h" }
            );
            return res.status(200).json({ userRegister, token });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

exports.loginFacebook = async (req, res) => {
    const { name, email, id } = req.body;

    try {
        const user = await User.findOne({ facebookId: id });

        if (user) {
            const token = jsonwebtoken.sign(
                { id: user.id },
                process.env.TOKEN_SELECT_KEY,
                { expiresIn: "24h" }
            );
            return res.status(200).json({ user, token });
        } else {
            const userRegister = await User.create({
                username: id,
                fullName: name,
                email,
                facebookId: id,
                status: true,
            });
            const token = jsonwebtoken.sign(
                { id: userRegister.id },
                process.env.TOKEN_SELECT_KEY,
                { expiresIn: "24h" }
            );
            return res.status(200).json({ user: userRegister, token });
        }
    } catch (error) {
        console.log({ error: error });
        res.status(500).json(error);
    }
};

exports.isActive = async (req, res) => {
    try {
        const { codeConfirmEmail } = req.body;

        const user = await User.findOne({
            codeConfirm: codeConfirmEmail,
        });

        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        param: "codeConfirmEmail",
                        msg: "Mã xác nhận không chính xác",
                    },
                ],
            });
        }

        const token = jsonwebtoken.sign(
            { id: user.id },
            process.env.TOKEN_SELECT_KEY,
            { expiresIn: "24h" }
        );
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json(error);
    }
};
