"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "muhzinsidhiq333@gmail.com",
        pass: "iiue xtwn lkkf jfps",
    },
});
const sendMail = (userMail, res) => {
    const otp = parseInt((Math.random() * 1000000).toString(), 10);
    const globalData = otp;
    // Store the OTP in localStorage with a key
    const mailOptions = {
        from: "muhzinsidhiq333@gmail.com",
        to: userMail,
        subject: "Sending Email using Node.js",
        html: "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>",
        text: "That was easy!",
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Email sending failed" }); // Handle the error
        }
        else {
            res.status(200).json({ message: "Email sent successfully" }); // Send a success response
        }
    });
    return globalData;
};
exports.sendMail = sendMail;
