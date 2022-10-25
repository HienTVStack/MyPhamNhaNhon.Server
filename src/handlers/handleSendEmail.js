const nodemailer = require("nodemailer");
const { htmlVerifyEmail } = require("../html/verifyEmail");

const mailConfig = () => {
    return {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    };
};
module.exports = mailConfig;
