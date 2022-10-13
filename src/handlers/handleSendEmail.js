const nodemailer = require("nodemailer");
const { htmlVerifyEmail } = require("../html/verifyEmail");

exports.verifyEmail = (req, res, next) => {
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
        subject: "TIỆM MỸ PHẨM NHÀ NHƠN - XÁC NHẬN ĐĂNG KÝ TÀI KHOẢN",
        html: htmlVerifyEmail(req.body.fullName, "api"),
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            return res
                .status(500)
                .json({ message: `Error send email`, errors: err });
        } else {
            console.log(info);
        }
    });
    next();
};

exports.transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// const mailConfig = {
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//     },
// };
// module.exports = mailConfig;
