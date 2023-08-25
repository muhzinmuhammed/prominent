import express from 'express'
const tutorRouter=express.Router()
import { instructorSignup } from '../../controller/tutorController/tutorController'


/*instructor register*/
tutorRouter.post('/register',instructorSignup)

/*instructor register*/


/*instructor login*/


/*instructor login*/



export default tutorRouter