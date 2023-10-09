import express from "express";
const studentRouter = express.Router();

import {
  addReview,
  getReview,
} from "../../controller/studentController/reviewController";

import {
  studentSignup,
  loginStudent,
  student_singup_verify_otp,
  instructor,
  allUsers,
  forgetPassword,
  verifyForgetPassword,
  newPassword,
} from "../../controller/studentController/studentController";
import {
  entrolledCourse,
  getAllCourses,
  entrolledCourseDetails,
} from "../../controller/studentController/getAllCourse";
import {
  getAllEntrolledLesson,
  getAllLesson,
} from "../../controller/studentController/getAllLessons";

import {
  orderDetails,
  verifyOrder,
} from "../../controller/studentController/paymentController";
import {
  CourseRefund,
  getWallet,
} from "../../controller/studentController/walletController";
import { protect } from "../../middleware/authMiddleware";
/*student register*/
studentRouter.post("/register", studentSignup);
/*student register*/

/*student login*/
studentRouter.post("/login", loginStudent);

/*student login*/

/* forget password */
studentRouter.post("/forget_password", forgetPassword);
/* forget password */
/* verify otp forget password */
studentRouter.post("/otp_verify", verifyForgetPassword);
/* verify otp forget password */

/*student login with otp*/
studentRouter.post("/signup_verify", student_singup_verify_otp);
/*student login with otp*/
/*student login with otp*/
studentRouter.post("/newpassword", newPassword);
/*student login with otp*/

/* get all tutors*/
studentRouter.get("/allTutors", instructor);
/* get all tutors*/

/* get all course*/
studentRouter.get("/allCourses", getAllCourses);
/* get all course*/
studentRouter.get("/allLessons/:id", getAllLesson);
studentRouter.get("/entrolledlessons/:id", getAllEntrolledLesson);

/* get all*/

/* payment getway*/
studentRouter.post("/create-payment", orderDetails);
/* payment getway*/
/* payment getway*/
studentRouter.post("/verify", verifyOrder);
/* payment getway*/

/* entrolled coursers*/
studentRouter.get("/entrolled/:id", entrolledCourse);
/* entrolled coursers*/

/* entrolled coursers*/
studentRouter.get("/entrolledcourseDetails/:id", entrolledCourseDetails);
/* entrolled coursers*/

/* review course*/

studentRouter.post("/addreview", addReview);

/* review course*/

/* get review*/
studentRouter.get("/getreview/:id", protect, getReview);
/* get review*/
/* get users*/
studentRouter.get("/allusers/:id", allUsers);
/* get users*/
/* course refund  */
studentRouter.post("/course_refund/:id", protect, CourseRefund);
/* course refund  */
/* course refund  */
studentRouter.get("/wallet/:id", protect, getWallet);
/* course refund  */

export default studentRouter;
