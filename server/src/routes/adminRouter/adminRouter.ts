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
import { adminProtect } from "../../middleware/adminMiddleware";






/*admin login*/
adminRouter.post("/adminlogin", loginAdmin);
/*admin login*/

/*admin get all student*/
adminRouter.get("/getallstudent",adminProtect, getAllStudent);
/*admin get all student*/

/*admin get all instrcutor*/
adminRouter.get("/getallinstrcutor",adminProtect, getAllInstructor);
/*admin get all instrcutor*/

/*admin add category*/
adminRouter.post("/addCategory",adminProtect,addCategory)
/*admin add category*/


/*admin get all instrcutor*/
adminRouter.get("/getallcategory",adminProtect, getAllCategory);
/*admin get all instrcutor*/

/*block student*/
adminRouter.put("/blockStudents/:id",adminProtect, blockStudent);
/*block student*/

/*unblock student*/
adminRouter.put("/unblockStudents/:id",adminProtect, unBlockStudent);
/*unblock student*/

/*admin add course */
adminRouter.get('/getAllCourses',adminProtect,getCourses)

/*admin add course */

/*approved course*/
adminRouter.put('/approvedCourse/:id',approvedCourseByAdmin)
/*approved course*/

/*approved course*/
adminRouter.put('/unapprovedCourse/:id',unApprovedCourseByAdmin)
/*unapproved course*/


export default adminRouter;
