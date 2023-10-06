import { Response } from "express-serve-static-core";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "muhzinsidhiq333@gmail.com",
    pass: "iiue xtwn lkkf jfps",
  },
});
const sendMail = (userMail: string, res: Response) => {
  const otp = parseInt((Math.random() * 1000000).toString(), 10);
  const globalData = otp;

  // Store the OTP in localStorage with a key

  const mailOptions = {
    from: "muhzinsidhiq333@gmail.com",
    to: userMail, // Use the parameter userMail
    subject: "Sending Email using Node.js",
    html:
      "<h3>OTP for account verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otp +
      "</h1>",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Email sending failed" }); // Handle the error
    } else {
      res.status(200).json({ message: "Email sent successfully" }); // Send a success response
    }
  });
  return globalData;
};
export { sendMail };
