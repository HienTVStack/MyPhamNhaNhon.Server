const Employee = require("../models/Employee");
const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");

exports.getAll = async (req, res) => {
    try {
        const users = await Employee.find({}).sort({ createdAt: 1 });

        res.status(200).json({ message: "OK", success: true, description: "GET ALL EMPLOYEE SUCCESS", users: users });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", success: false, description: "GET ALL USER FAILED" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const emp = await Employee.findOne({ username }).select("password username");
        if (!emp) {
            return res.status(401).json({
                errors: [
                    {
                        param: "username",
                        msg: `Tên đăng nhập hoặc mật khẩu không chính xác`,
                    },
                ],
            });
        }

        const decryptedPass = CryptoJS.AES.decrypt(emp.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);

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

        emp.password = undefined;

        const token = jsonwebtoken.sign({ id: emp._id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });

        res.status(200).json({ message: "OK", emp, token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

exports.register = async (req, res) => {
    const { password } = req.body;

    try {
        req.body.password = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);

        const emp = await Employee.create(req.body);
        //Handle send email

        res.status(201).json({ emp });
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
};
