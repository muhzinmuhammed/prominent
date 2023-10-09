import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import LessonModel from "../../models/lesson";
import instructorModel from "../../models/instructor";
import CourseModel from "../../models/addCourse";

/* add category */

const addLesson = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    
    const { video, coursename,title,duration,description } = req.body;

console.log(typeof(video));

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { _id: coursename },
      { $push: { courseLessons:{ video,title:title,duration:duration,description:description} } },
      { new: true }
    );
    if (updatedCourse) {
      res.status(201).json(updatedCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/* add category */

/* get all courses*/
const getLesson = asyncHandler(async (req: Request, res: Response) => {
 
  
  
  try {
    const {id}=req.params
   
    
    const courses = await CourseModel.findById(id)
     
     
    const allLessons = courses?.courseLessons;

    

    if (allLessons) {
      res.status(200).json({
        allLessons,
      });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});
/* get all courses*/

const getTutor = asyncHandler(async (req: Request, res: Response) => {
  try {
    const tutor = await instructorModel.find().exec();

    if (tutor) {
      res.status(200).json({
        tutor,
      });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

export { addLesson, getLesson, getTutor };
