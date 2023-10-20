"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPassword = exports.verifyForgetPassword = exports.forgetPassword = exports.allUsers = exports.instructor = exports.student_singup_verify_otp = exports.loginStudent = exports.studentSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../../models/userModel"));
const genarateToken_1 = __importDefault(require("../../../utlitis/genarateToken"));
const instructor_1 = __importDefault(require("../../models/instructor"));
require("dotenv/config");
const userModel_2 = __importDefault(require("../../models/userModel"));
const mailSender_1 = require("../../middleware/mailSender");
/*student register*/
const globalData = {
    otp: null,
    user: null, // Define a type for user
};
const studentSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentname, studentemail, password, phone } = req.body;
        if (!studentname || !studentemail || !password || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const userExists = yield userModel_1.default.findOne({ studentemail });
        const userPhone = yield userModel_1.default.findOne({ phone });
        if (userExists || userPhone) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = {
            studentname,
            studentemail,
            phone,
            password,
        };
        globalData.user = user;
        if (user) {
            const mail = (0, mailSender_1.sendMail)(user.studentemail, res);
            globalData.otp = mail;
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});
exports.studentSignup = studentSignup;
/*student register*/
const student_singup_verify_otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (otp == globalData.otp) {
            const addUser = yield userModel_1.default.create(globalData.user);
            const token = (0, genarateToken_1.default)(addUser._id);
            return res.status(200).json({
                _id: addUser === null || addUser === void 0 ? void 0 : addUser._id,
                name: addUser === null || addUser === void 0 ? void 0 : addUser.studentname,
                email: addUser === null || addUser === void 0 ? void 0 : addUser.studentemail,
                phone: addUser === null || addUser === void 0 ? void 0 : addUser.phone,
                token,
            });
        }
        else {
            res.status(500).json({ message: "Wrong otp" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});
exports.student_singup_verify_otp = student_singup_verify_otp;
/*student login*/
const loginStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentemail, password } = req.body;
    try {
        const user = yield userModel_1.default
            .findOne({ studentemail })
            .where({ isBlocked: false });
        // Use StudentModel instead of userModel
        if (!user) {
            return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
        }
        if ((user === null || user === void 0 ? void 0 : user.isBlocked) == true) {
            return res.status(401).json({ message: "User is Blocked" });
        }
        if (user && (yield user.matchPassword(password))) {
            const token = (0, genarateToken_1.default)(user._id);
            return res.json({
                _id: user._id,
                name: user.studentname,
                phone: user.phone,
                email: user.studentemail,
                isBlocked: user.isBlocked,
                token,
            });
        }
        else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.loginStudent = loginStudent;
/*student login*/
/* get all instrctor*/
const instructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allInstrcutor = yield instructor_1.default.find().exec();
    res.status(200).json({
        allInstrcutor,
    });
});
exports.instructor = instructor;
/* get all instrctor*/
/* get all students*/
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const users = yield userModel_2.default.find({ _id: { $ne: id } });
        return res.json(users).status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.allUsers = allUsers;
/* get all students*/
/* forget password*/
const forgetData = {
    otp: null,
};
const forgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentemail } = req.body;
        const userExists = yield userModel_1.default.findOne({ studentemail });
        if (userExists) {
            const otp = (0, mailSender_1.sendMail)(studentemail, res);
            forgetData.otp = otp;
        }
        else {
            return res.status(400).json({ message: "no user " });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.forgetPassword = forgetPassword;
/* forget password*/
/* verify otp*/
const verifyForgetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        if (otp == forgetData.otp) {
            return res.status(200).json({ message: "success" });
        }
        else {
            return res.status(400).json({ message: "please correct passowrd" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.verifyForgetPassword = verifyForgetPassword;
/* verify otp*/
/* new password */
const newPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentemail, password } = req.body;
        userModel_1.default.findOne({ studentemail: studentemail }).then((user) => {
            const saltRounds = 10; // You can adjust the number of salt rounds as needed
            bcrypt_1.default.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while hashing the password",
                    });
                }
                else {
                    userModel_1.default
                        .findOneAndUpdate({ studentemail: studentemail }, { password: hash })
                        .then((data) => {
                        if (!data) {
                            res.status(404).send({
                                message: `Cannot update user with ID: ${studentemail}. User not found.`,
                            });
                        }
                        else {
                            res.status(200).send({
                                message: "Successfully updated password",
                            });
                        }
                    })
                        .catch((err) => {
                        res
                            .status(500)
                            .send({ message: "Error updating user information" });
                    });
                }
            });
        });
    }
    catch (error) {
        console.log(error);
        // Handle other errors if needed
        res.status(500).send({ message: "An error occurred" });
    }
});
exports.newPassword = newPassword;
