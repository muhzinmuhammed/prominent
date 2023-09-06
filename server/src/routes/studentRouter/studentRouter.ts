import express from 'express'
const studentRouter=express.Router()

import { studentSignup,loginStudent, student_singup_verify_otp } from '../../controller/studentController/studentController'
/*student register*/
studentRouter.post('/register',studentSignup)
/*student register*/


/*student login*/
studentRouter.post('/login',loginStudent)

/*student login*/

/*student login with otp*/
studentRouter.post('/signup_verify',student_singup_verify_otp)
/*student login with otp*/



export default studentRouter