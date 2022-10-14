const nodemailer = require("nodemailer");
const { htmlVerifyEmail } = require("../html/verifyEmail");

const mailConfig = {
    host: 123,
    port: 123,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
};
module.exports = mailConfig;
