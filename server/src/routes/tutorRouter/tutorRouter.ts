import express from 'express'
const tutorRouter=express.Router()
import { instructorSignup,loginInstructor } from '../../controller/tutorController/tutorController'
import { addCategory,getAllCategory } from '../../controller/tutorController/addCategory'
import { addCourses,editCourse,editCoursePage,getCourses } from '../../controller/tutorController/addCourse'
import { addLesson,getLesson, getTutor } from '../../controller/tutorController/addLesson'
import { tutorProtect } from '../../middleware/tutorMiddleware'


/*instructor register*/
tutorRouter.post('/register',instructorSignup)

/*instructor register*/


/*instructor login*/

tutorRouter.post('/login',loginInstructor)


/*instructor login*/


/*add category*/
tutorRouter.post('/addCategory',tutorProtect,addCategory)

/*add category*/

/*add category*/
tutorRouter.get('/getCategory',tutorProtect,getAllCategory)

/*add category*/

/*add courses*/
tutorRouter.post('/addCourse',tutorProtect,addCourses)


/*add courses*/

/*get all courses*/
tutorRouter.get('/allcourses/:id',tutorProtect,getCourses)
/*get all courses*/
/*specified edit course*/
tutorRouter.get('/courses/:id',editCoursePage)
/*specified edit course*/
/*get all courses*/
tutorRouter.put('/edit_courses/:id',tutorProtect,editCourse)
/*get all courses*/

  /*add lessons*/
  tutorRouter.post('/addLesson',tutorProtect,addLesson)

/*add courses*/


/* get all lessons*/
tutorRouter.get('/getLessons',tutorProtect,getLesson)
/* get all lessons*/

/* get all lessons*/
tutorRouter.get('/allInstructor',tutorProtect,getTutor)
/* get all lessons*/




export default tutorRouter