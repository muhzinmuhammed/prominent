import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import LessonModel from "../../models/lesson";
import instructorModel from '../../models/instructor'


/* add category */

const addLesson = asyncHandler(async (req: Request, res: Response) => {
  
    try {
        const { coursename,title, duration,coursedescrption,category,instructor } = req.body;
       

        

        const Course = await LessonModel.create({
            title,
            coursename,
            duration,
            coursedescrption,
            category,
            instructor
           
        });
        if (Course) {
            res.status(200).json({
                title,
                coursename,
                duration,
                coursedescrption,
                category,
                instructor

            })
            
        }else {
            res.status(400).json({ message: "Invalid instructor data" })
        }

        
        
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});

/* add category */


/* get all courses*/
const getLesson=asyncHandler(async (req: Request, res: Response) => {
  
    try {

        const courses=await LessonModel.find().populate('instructor').populate('coursename').populate('category')
        console.log(courses,"kkk");
        
        if (courses) {

            res.status(200).json({
                courses

            })
            
        }
    

        
        
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});
/* get all courses*/



const getTutor=asyncHandler(async (req: Request, res: Response) => {
  
    try {

        const tutor=await instructorModel.find().exec()
        console.log(tutor,"kkk");
        
        if (tutor) {

            res.status(200).json({
                tutor

            })
            
        }
    

        
        
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});








export {addLesson,getLesson,getTutor}