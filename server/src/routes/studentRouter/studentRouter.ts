import express from 'express'
const studentRouter=express.Router()

import { studentSignup,loginStudent, student_singup_verify_otp, instructor } from '../../controller/studentController/studentController'
import { entrolledCourse, getAllCourses } from '../../controller/studentController/getAllCourse'
import { getAllLesson } from '../../controller/studentController/getAllLessons'
import { protect } from '../../middleware/authMiddleware'
import { orderDetails, verifyOrder } from '../../controller/studentController/paymentController'
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



export default studentRouter