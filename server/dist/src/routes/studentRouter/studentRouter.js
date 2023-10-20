"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentRouter = express_1.default.Router();
const reviewController_1 = require("../../controller/studentController/reviewController");
const studentController_1 = require("../../controller/studentController/studentController");
const getAllCourse_1 = require("../../controller/studentController/getAllCourse");
const getAllLessons_1 = require("../../controller/studentController/getAllLessons");
const paymentController_1 = require("../../controller/studentController/paymentController");
const walletController_1 = require("../../controller/studentController/walletController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
/*student register*/
studentRouter.post("/register", studentController_1.studentSignup);
/*student register*/
/*student login*/
studentRouter.post("/login", studentController_1.loginStudent);
/*student login*/
/* forget password */
studentRouter.post("/forget_password", studentController_1.forgetPassword);
/* forget password */
/* verify otp forget password */
studentRouter.post("/otp_verify", studentController_1.verifyForgetPassword);
/* verify otp forget password */
/*student login with otp*/
studentRouter.post("/signup_verify", studentController_1.student_singup_verify_otp);
/*student login with otp*/
/*student login with otp*/
studentRouter.post("/newpassword", studentController_1.newPassword);
/*student login with otp*/
/* get all tutors*/
studentRouter.get("/allTutors", studentController_1.instructor);
/* get all tutors*/
/* get all course*/
studentRouter.get("/allCourses", getAllCourse_1.getAllCourses);
/* get all course*/
studentRouter.get("/allLessons/:id", getAllLessons_1.getAllLesson);
studentRouter.get("/entrolledlessons/:id", getAllLessons_1.getAllEntrolledLesson);
/* get all*/
/* payment getway*/
studentRouter.post("/create-payment", paymentController_1.orderDetails);
/* payment getway*/
/* payment getway*/
studentRouter.post("/verify", paymentController_1.verifyOrder);
/* payment getway*/
/* entrolled coursers*/
studentRouter.get("/entrolled/:id", getAllCourse_1.entrolledCourse);
/* entrolled coursers*/
/* entrolled coursers*/
studentRouter.get("/entrolledcourseDetails/:id", getAllCourse_1.entrolledCourseDetails);
/* entrolled coursers*/
/* review course*/
studentRouter.post("/addreview", reviewController_1.addReview);
/* review course*/
/* get review*/
studentRouter.get("/getreview/:id", authMiddleware_1.protect, reviewController_1.getReview);
/* get review*/
/* get users*/
studentRouter.get("/allusers/:id", studentController_1.allUsers);
/* get users*/
/* course refund  */
studentRouter.post("/course_refund/:id", authMiddleware_1.protect, walletController_1.CourseRefund);
/* course refund  */
/* course refund  */
studentRouter.get("/wallet/:id", authMiddleware_1.protect, walletController_1.getWallet);
/* course refund  */
exports.default = studentRouter;
