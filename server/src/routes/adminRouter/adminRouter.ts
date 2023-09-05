import express from "express";
const adminRouter = express.Router();
import {
  loginAdmin,
  getAllStudent,
  getAllInstructor,
  blockStudent,
  unBlockStudent,
  getAllCategory,
} from "../../controller/adminController/adminController";
import { adminAddCourses } from "../../controller/adminController/adminAddCourse";






/*admin login*/
adminRouter.post("/adminlogin", loginAdmin);
/*admin login*/

/*admin get all student*/
adminRouter.get("/getallstudent", getAllStudent);
/*admin get all student*/

/*admin get all instrcutor*/
adminRouter.get("/getallinstrcutor", getAllInstructor);
/*admin get all instrcutor*/
/*admin get all instrcutor*/
adminRouter.get("/getallcategory", getAllCategory);
/*admin get all instrcutor*/

/*block student*/
adminRouter.put("/blockStudents/:id", blockStudent);
/*block student*/

/*unblock student*/
adminRouter.put("/unblockStudents/:id", unBlockStudent);
/*unblock student*/

/*admin add course */
adminRouter.post('/admin_add_course',adminAddCourses)

/*admin add course */

export default adminRouter;
