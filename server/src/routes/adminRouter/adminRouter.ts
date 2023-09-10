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
import { approvedCourseByAdmin, getCourses, unApprovedCourseByAdmin } from "../../controller/adminController/adminAddCourse";
import { addCategory } from "../../controller/adminController/adminAddCategory";






/*admin login*/
adminRouter.post("/adminlogin", loginAdmin);
/*admin login*/

/*admin get all student*/
adminRouter.get("/getallstudent", getAllStudent);
/*admin get all student*/

/*admin get all instrcutor*/
adminRouter.get("/getallinstrcutor", getAllInstructor);
/*admin get all instrcutor*/

/*admin add category*/
adminRouter.post("/addCategory",addCategory)
/*admin add category*/


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
adminRouter.get('/getAllCourses',getCourses)

/*admin add course */

/*approved course*/
adminRouter.put('/approvedCourse/:id',approvedCourseByAdmin)
/*approved course*/

/*approved course*/
adminRouter.put('/unapprovedCourse/:id',unApprovedCourseByAdmin)
/*unapproved course*/


export default adminRouter;
