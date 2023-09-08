import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import addCourse  from '../../models/addCourse'
import addLesson from '../../models/lesson'


/* add course */

const addCourses = asyncHandler(async (req: Request, res: Response) => {
    console.log("lll");
    
  
    try {
        const { coursename, courseduration,coursedescrption,category,instructor,photo,coursefee } = req.body;
      console.log(instructor);
      
      
       

        

        const Course = await addCourse.create({
            coursename,
            courseduration,
            coursedescrption,
            category,
            instructor,
            photo,
            coursefee
           
        });
        if (Course) {
            res.status(200).json({
                coursename,
                courseduration,
                coursedescrption,
                category,
                instructor,
                photo,
                coursefee

            })
            
        }else {
            res.status(400).json({ message: "Invalid instructor data" })
        }

        
        
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});

/* add course */


/* get all courses*/
const getCourses=asyncHandler(async (req: Request, res: Response) => {
  
    try {

        const courses=await addCourse.find().populate('instructor').populate('category')
        console.log(courses,"jj");
        
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





export {addCourses,getCourses}