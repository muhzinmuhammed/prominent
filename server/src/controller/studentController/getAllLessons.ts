import { Response, Request } from "express";

import LessonModel from "../../models/lesson";
import CourseModel from "../../models/addCourse";

const getAllLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const lessons = await CourseModel.findById(id)
    
    
     
      
      
      
      
    res.status(200).json({ lessons });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export { getAllLesson };
