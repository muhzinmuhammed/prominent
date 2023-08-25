import express from 'express'
const studentRouter=express.Router()

import { studentSignup,loginStudent } from '../../controller/studentController/studentController'
/*student register*/
studentRouter.post('/register',studentSignup)
/*student register*/


/*student login*/
studentRouter.post('/login',loginStudent)

/*student login*/



export default studentRouter