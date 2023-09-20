import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import addCourse from "../../models/addCourse";

/* add course */

const addCourses = asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      coursename,
      courseduration,
      coursedescrption,
      category,
      instructor,
      photo,
      coursefee,
    } = req.body;

    const Course = await addCourse.create({
      coursename,
      courseduration,
      coursedescrption,
      category,
      instructor,
      photo,
      coursefee,
    });
    if (Course) {
      res.status(200).json({
        coursename,
        courseduration,
        coursedescrption,
        category,
        instructor,
        photo,
        coursefee,
      });
    } else {
      res.status(400).json({ message: "Invalid instructor data" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/* add course */

/* get all courses*/
const getCourses = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   
    

    const courses = await addCourse
      .find({ instructor: id })
      .populate("instructor")
      .populate("category");
      
      

    if (courses) {
      res.status(200).json({
        courses,
      });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});


/* get all courses*/


/* edit page */
const editCoursePage=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const editCourse=await addCourse.findById(id)
        if (editCourse) {
            res.status(200).json({
                editCourse
            })
           
            
        }
        else{
            res.status(400).json({message:"No course"})
        }
        
    } catch (error) {
        res.status(500).json({message:"Internal server"})
        
    }
}
/* edit page * /

/* update courses */
const editCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    
    const {
      coursename,
      courseduration,
      coursedescrption,
      category,
      coursefee,
    } = req.body;
    const course = await addCourse.findById(id);
    if (!course) {
      // Handle the case where the course with the given ID is not found.
      return res.status(404).json({ message: "Course not found" });
    } else {
      const updateCourse = await addCourse.findByIdAndUpdate(id, {
        coursename,
        courseduration,
        coursedescrption,
        category,
        coursefee,
      },{ new: true });
      res.status(200).json({
        updateCourse
      })
    }
  } catch (error) {
    console.log(error);
  }
};
/* edit courses */

export { addCourses, getCourses, editCourse,editCoursePage };
