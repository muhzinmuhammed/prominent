import express from 'express'
const studentRouter=express.Router()

import { addReview, getReview } from '../../controller/studentController/reviewController'

import { studentSignup,loginStudent, student_singup_verify_otp, instructor, allUsers } from '../../controller/studentController/studentController'
import {  entrolledCourse, getAllCourses,entrolledCourseDetails } from '../../controller/studentController/getAllCourse'
import { getAllLesson } from '../../controller/studentController/getAllLessons'

import { orderDetails, verifyOrder } from '../../controller/studentController/paymentController'
import { CourseRefund } from '../../controller/studentController/walletController'
/*student register*/
studentRouter.post('/register',studentSignup)
/*student register*/


/*student login*/
studentRouter.post('/login',loginStudent)

/*student login*/

/*student login with otp*/
studentRouter.post('/signup_verify',student_singup_verify_otp)
/*student login with otp*/


/* get all tutors*/
studentRouter.get('/allTutors',instructor)
/* get all tutors*/
/* get all course*/
studentRouter.get('/allCourses',getAllCourses)
/* get all course*/
studentRouter.get("/allLessons/:id",getAllLesson)

/* get all*/

/* payment getway*/
studentRouter.post("/create-payment",orderDetails)
/* payment getway*/
/* payment getway*/
studentRouter.post("/verify",verifyOrder)
/* payment getway*/

/* entrolled coursers*/
studentRouter.get('/entrolled/:id',entrolledCourse)
/* entrolled coursers*/

/* entrolled coursers*/
studentRouter.get('/entrolledcourseDetails/:id',entrolledCourseDetails)
/* entrolled coursers*/

/* review course*/

studentRouter.post('/addreview',addReview)


/* review course*/

/* get review*/
studentRouter.get('/getreview/:courseId', getReview);
/* get review*/
/* get users*/
studentRouter.get("/allusers/:id", allUsers);
/* get users*/
/* course refund  */
studentRouter.post('/course_refund/:id',CourseRefund)
/* course refund  */

export default studentRouter