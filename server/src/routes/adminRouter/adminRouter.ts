import express from 'express'
const adminRouter=express.Router()
import { loginAdmin,getAllStudent,getAllInstructor } from '../../controller/adminController/adminController'

/*admin login*/
adminRouter.post('/adminlogin',loginAdmin)
/*admin login*/

/*admin get all student*/
adminRouter.get('/getallstudent',getAllStudent)
/*admin get all student*/
/*admin get all instrcutor*/
adminRouter.get('/getallinstrcutor',getAllInstructor)
/*admin get all instrcutor*/



export default adminRouter