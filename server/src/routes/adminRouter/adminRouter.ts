import express from "express";
const adminRouter = express.Router();
import {
  loginAdmin,
  getAllStudent,
  getAllInstructor,
  blockStudent,
  unBlockStudent,
} from "../../controller/adminController/adminController";

/*admin login*/
adminRouter.post("/adminlogin", loginAdmin);
/*admin login*/

/*admin get all student*/
adminRouter.get("/getallstudent", getAllStudent);
/*admin get all student*/
/*admin get all instrcutor*/
adminRouter.get("/getallinstrcutor", getAllInstructor);
/*admin get all instrcutor*/

/*block student*/
adminRouter.put("/blockStudents/:id", blockStudent);
/*block student*/

/*unblock student*/
adminRouter.put("/unblockStudents/:id", unBlockStudent);
/*unblock student*/

export default adminRouter;
