import express from 'express'
const tutorRouter=express.Router()
import { instructorSignup,loginInstructor } from '../../controller/tutorController/tutorController'
import { addCategory } from '../../controller/tutorController/addCategory'
import { addCourses,getCourses } from '../../controller/tutorController/addCourse'
import { addLesson,getLesson } from '../../controller/tutorController/addLesson'

/*instructor register*/
tutorRouter.post('/register',instructorSignup)

/*instructor register*/


/*instructor login*/

tutorRouter.post('/login',loginInstructor)


/*instructor login*/


/*add category*/
tutorRouter.post('/addCategory',addCategory)

/*add category*/

/*add courses*/
tutorRouter.post('/addCourse',addCourses)


/*add courses*/

/*get all courses*/
tutorRouter.get('/allcourses',getCourses)
/*get all courses*/

  /*add lessons*/
  tutorRouter.post('/addLesson',addLesson)

/*add courses*/


/* get all lessons*/
tutorRouter.get('/getLessons',getLesson)
/* get all lessons*/




export default tutorRouter