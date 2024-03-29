const CryptoJS = require("crypto-js");
const jsonwebtoken = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/Auth");
const { htmlVerifyEmail } = require("../html/verifyEmail");
const { htmlForgotPassword } = require("../html/forgotPassword");
const { isObjectId } = require("../handlers/validation");

exports.getAll = async (req, res) => {
  try {
    const userList = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json({ message: "OK", success: true, description: "GET ALL USER SUCCESS", userList: userList });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "FAIL", success: false, description: "GET ALL USER FAILED" });
  }
};

exports.register = async (req, res) => {
  const { password } = req.body;

  try {
    req.body.password = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);

    const user = await User.create(req.body);
    //Handle send email
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

    const user = await User.findOne({ username, status: true }).select("password username");
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

    const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);

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

    const token = jsonwebtoken.sign({ id: user._id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });

    res.status(200).json({ message: "OK", user, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.loginGoogle = async (req, res) => {
  try {
    const { id, name, email } = req.body;
    const user = await User.findOne({ googleId: id });

    if (user) {
      const token = jsonwebtoken.sign({ id: user.id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });
      return res.status(200).json({ user, token });
    } else {
      const userRegister = await User.create({
        username: id,
        emailGoogle: email,
        fullName: name,
        googleId: id,
        status: true,
      });
      const token = jsonwebtoken.sign({ id: userRegister._id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });
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
      const token = jsonwebtoken.sign({ id: user.id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });
      return res.status(200).json({ user, token });
    } else {
      const userRegister = await User.create({
        username: id,
        fullName: name,
        emailFacebook: email,
        facebookId: id,
        status: true,
      });
      const token = jsonwebtoken.sign({ id: userRegister.id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });
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
    user.status = true;
    await user.save();
    const token = jsonwebtoken.sign({ id: user.id }, process.env.TOKEN_SELECT_KEY, { expiresIn: "24h" });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    const today = new Date();
    const date = today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

    if (!user) {
      return res.status(404).json({
        errors: [
          {
            param: "email",
            msg: "E-mail không chính xác",
          },
        ],
      });
    }
    //Handle send email
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
      subject: `${process.env.NAME_SHOP} - THAY ĐỔI MẬT KHẨU `,
      html: htmlForgotPassword(user.fullName, `${process.env.HOSTING}/thay-doi-mat-khau?username=${user.username}&email=${user.email}&date=${date}`),
    };
    transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(`Don't send email to ${user.fullName}`);
      }
    });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

exports.updatePassword = async (req, res) => {
  const { password, email } = req.body;
  try {
    const cryptPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);
    const user = await User.findOneAndUpdate({ email: email }, { password: cryptPassword.toString() }, { new: true });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error });
  }
};

exports.changePassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ _id: id }).select("password username");

    const decryptedPass = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (oldPassword !== decryptedPass) {
      return res.status(404).json({ success: false, description: "PASSWORD NOT MATCHES" });
    }

    const cryptPassword = CryptoJS.AES.encrypt(newPassword, process.env.PASSWORD_SECRET_KEY);
    user.password = cryptPassword.toString();

    await user.save();
    res.status(200).json({ success: true, description: "CHANGE PASSWORD USER SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, description: "CHANGE PASSWORD USER FAILED" });
  }
};

exports.updateInfo = async (req, res) => {
  const { province, district, ward, addressDetail } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { addressProvince: province, addressDistrict: district, addressWard: ward, address: addressDetail }
    );
    res.status(200).json({ message: "OK", success: true, description: "UPDATE INFORMATION USER SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "OK", success: false, description: "UPDATE INFORMATION USER FAILED" });
  }
};

// Cart

exports.addCart = async (req, res) => {
  const { id } = req.params;
  const cart = req.body;

  try {
    await User.findOne({ _id: id })
      .then(async (user) => {
        if (user?.carts?.length !== 0) {
          for (let item of user.carts) {
            if (item.id === cart.id && item.idType === cart.idType) {
              item.quantity += Number(cart.quantity);
              const tmp = await user.save();
              return res.status(200).json({ success: true, data: { message: "Thêm vào giỏ hàng thành công", user: tmp } });
            }
          }
        }
        user.carts.push(cart);
        const tmp = await user.save();
        return res.status(200).json({ success: true, data: { message: "Thêm vào giỏ hàng thành công", user: tmp } });
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).json({ success: false, data: { message: err } });
      });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ success: false, data: { message: error } });
  }
};

exports.removedCartItem = async (req, res) => {
  const { id } = req.params;
  try {
    const auth = await User.findOneAndUpdate({ _id: id }, { $pull: { carts: { _id: req.body.id } } });
    const tmpAuth = await User.findOne({ _id: id });
    res.status(200).json({ success: true, data: { message: "Loại bỏ sản phẩm khỏi giỏ hàng thành công", user: tmpAuth } });
  } catch (error) {
    console.error(error);
    res.status(404).json({ success: false, data: { message: "Loại bỏ sản phẩm khỏi giỏ hàng thất bại" } });
  }
};

//

exports.totalAccess = async (req, res) => {
  try {
    const totalEmail = User.find({ email: { $exists: true } }).count();
    const totalGoogle = User.find({ emailGoogle: { $exists: true } }).count();
    const totalFacebook = User.find({ emailFacebook: { $exists: true } }).count();

    await Promise.all([totalEmail, totalGoogle, totalFacebook])
      .then((value) => {
        res.status(200).json({ message: "OK", success: true, value });
      })
      .catch((err) => res.status(404).json({ message: "FAIL", success: false, description: "FAILED" }));
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "FAIL", success: false, description: "FAILED" });
  }
};
