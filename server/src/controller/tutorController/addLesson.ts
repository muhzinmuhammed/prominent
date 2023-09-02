import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import LessonModel from "../../models/lesson";


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





export {addLesson,getLesson}