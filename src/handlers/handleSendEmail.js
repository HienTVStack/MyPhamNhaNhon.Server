const nodemailer = require("nodemailer");
const { htmlVerifyEmail } = require("../html/verifyEmail");
const { updateStatusInvoice } = require("../html/updateStatusInvoice");

// const mailConfig = () => {
//     return {
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     };
// };
// module.exports = mailConfig;

exports.handleSendEmailUpdateStatus = (fullName, email, idInvoice) => {
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
        to: email,
        subject: `${process.env.NAME_SHOP} - CẬP NHẬT ĐƠN HÀNG `,
        html: updateStatusInvoice(fullName, idInvoice),
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(`Don't send email to ${fullName}`);
        }
    });
};
