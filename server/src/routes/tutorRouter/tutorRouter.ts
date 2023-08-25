import express from 'express'
const tutorRouter=express.Router()
import { instructorSignup,loginInstructor } from '../../controller/tutorController/tutorController'


/*instructor register*/
tutorRouter.post('/register',instructorSignup)

/*instructor register*/


/*instructor login*/

tutorRouter.post('/login',loginInstructor)


/*instructor login*/



export default tutorRouter