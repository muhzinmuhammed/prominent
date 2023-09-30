import { Response, Request } from "express";

import LessonModel from "../../models/lesson";
import CourseModel from "../../models/addCourse";

const getAllLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
   
    

    // Find the course by its ID
    const course = await CourseModel.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find all lessons with the same course_id
    const lessons = await LessonModel.find({ courseId: course._id })
      .populate("courseId")
      .populate("categoryId")
      .populate("instructorId");
     
      
      

    if (lessons) {
        res.status(200).json({ lessons });
        
    }

   
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllLesson };
