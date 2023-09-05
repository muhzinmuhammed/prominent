import express from 'express'
const tutorRouter=express.Router()
import { instructorSignup,loginInstructor } from '../../controller/tutorController/tutorController'
import { addCategory,getAllCategory } from '../../controller/tutorController/addCategory'
import { addCourses,getCourses } from '../../controller/tutorController/addCourse'
import { addLesson,getLesson, getTutor } from '../../controller/tutorController/addLesson'


/*instructor register*/
tutorRouter.post('/register',instructorSignup)

/*instructor register*/


/*instructor login*/

tutorRouter.post('/login',loginInstructor)


/*instructor login*/


/*add category*/
tutorRouter.post('/addCategory',addCategory)

/*add category*/

/*add category*/
tutorRouter.get('/getCategory',getAllCategory)

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

/* get all lessons*/
tutorRouter.get('/allInstructor',getTutor)
/* get all lessons*/




export default tutorRouter