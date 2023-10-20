"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
const adminController_1 = require("../../controller/adminController/adminController");
const adminAddCourse_1 = require("../../controller/adminController/adminAddCourse");
const adminAddCategory_1 = require("../../controller/adminController/adminAddCategory");
const adminMiddleware_1 = require("../../middleware/adminMiddleware");
const orderController_1 = require("../../controller/adminController/orderController");
const adminDashBoard_1 = require("../../controller/adminController/adminDashBoard");
/*admin login*/
adminRouter.post("/adminlogin", adminController_1.loginAdmin);
/*admin login*/
/*admin get all student*/
adminRouter.get("/getallstudent", adminMiddleware_1.adminProtect, adminController_1.getAllStudent);
/*admin get all student*/
/*admin get all instrcutor*/
adminRouter.get("/getallinstrcutor", adminMiddleware_1.adminProtect, adminController_1.getAllInstructor);
/*admin get all instrcutor*/
/*admin add category*/
adminRouter.post("/addCategory", adminMiddleware_1.adminProtect, adminAddCategory_1.addCategory);
/*admin add category*/
/*admin get all instrcutor*/
adminRouter.get("/getallcategory", adminMiddleware_1.adminProtect, adminController_1.getAllCategory);
/*admin get all instrcutor*/
/*block student*/
adminRouter.put("/blockStudents/:id", adminMiddleware_1.adminProtect, adminController_1.blockStudent);
/*block student*/
/*unblock student*/
adminRouter.put("/unblockStudents/:id", adminMiddleware_1.adminProtect, adminController_1.unBlockStudent);
/*unblock student*/
/*admin add course */
adminRouter.get('/getAllCourses', adminMiddleware_1.adminProtect, adminAddCourse_1.getCourses);
/*admin add course */
/*approved course*/
adminRouter.put('/approvedCourse/:id', adminAddCourse_1.approvedCourseByAdmin);
/*approved course*/
/*approved course*/
adminRouter.put('/unapprovedCourse/:id', adminAddCourse_1.unApprovedCourseByAdmin);
/*unapproved course*/
/* get orders*/
adminRouter.get('/order', adminMiddleware_1.adminProtect, orderController_1.viewOrder);
/* get orders*/
adminRouter.get('/total_count', adminMiddleware_1.adminProtect, adminDashBoard_1.TotalSales);
adminRouter.get('/sales_report', adminMiddleware_1.adminProtect, adminDashBoard_1.totalGraph);
exports.default = adminRouter;
