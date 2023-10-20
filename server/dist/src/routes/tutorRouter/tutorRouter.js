"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorRouter = express_1.default.Router();
const tutorController_1 = require("../../controller/tutorController/tutorController");
const addCategory_1 = require("../../controller/tutorController/addCategory");
const addCourse_1 = require("../../controller/tutorController/addCourse");
const addLesson_1 = require("../../controller/tutorController/addLesson");
const tutorMiddleware_1 = require("../../middleware/tutorMiddleware");
const entrollmentStudent_1 = require("../../controller/tutorController/entrollmentStudent");
const tutorDashBoard_1 = require("../../controller/tutorController/tutorDashBoard");
/*instructor register*/
tutorRouter.post("/register", tutorController_1.instructorSignup);
/*instructor register*/
/*instructor login*/
tutorRouter.post("/login", tutorController_1.loginInstructor);
/*instructor login*/
/*add category*/
tutorRouter.post("/addCategory", tutorMiddleware_1.tutorProtect, addCategory_1.addCategory);
/*add category*/
/*add category*/
tutorRouter.get("/getCategory", tutorMiddleware_1.tutorProtect, addCategory_1.getAllCategory);
/*add category*/
/*add courses*/
tutorRouter.post("/addCourse", tutorMiddleware_1.tutorProtect, addCourse_1.addCourses);
/*add courses*/
/*get all courses*/
tutorRouter.get("/allcourses/:id", tutorMiddleware_1.tutorProtect, addCourse_1.getCourses);
/*get all courses*/
/*specified edit course*/
tutorRouter.get("/courses/:id", addCourse_1.editCoursePage);
/*specified edit course*/
/*get all courses*/
tutorRouter.put("/edit_courses/:id", tutorMiddleware_1.tutorProtect, addCourse_1.editCourse);
/*get all courses*/
/*add lessons*/
tutorRouter.post("/addLesson", tutorMiddleware_1.tutorProtect, addLesson_1.addLesson);
/*add courses*/
/* get all lessons*/
tutorRouter.get("/get_lessons/:id", tutorMiddleware_1.tutorProtect, addLesson_1.getLesson);
/* get all lessons*/
/* get all lessons*/
tutorRouter.get("/allInstructor", tutorMiddleware_1.tutorProtect, addLesson_1.getTutor);
/* get all lessons*/
/* tutor course entrollment*/
tutorRouter.get("/orderTutor/:id", tutorMiddleware_1.tutorProtect, entrollmentStudent_1.viewOrderInTutor);
/* tutor course entrollmen*/
/*tutor dashboard*/
tutorRouter.get('/total_count/:id', tutorDashBoard_1.totalCount);
/*tutor dashboard*/
exports.default = tutorRouter;
