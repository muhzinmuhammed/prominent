import { Response, Request } from "express";

import LessonModel from "../../models/lesson";
import CourseModel from "../../models/addCourse";
import OrderModel from "../../models/orderModel";

const getAllLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the course by its ID
    const course = await CourseModel.findById(id)
      .populate("category")
      .populate("instructor");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find all lessons with the same course_id

    if (course) {
      res.status(200).json({ course });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getAllEntrolledLesson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the course by its ID
    const lessons = await OrderModel.findById(id)
      .populate("courseId")
      .populate("instructorId");
   
      

    if (!lessons) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (lessons) {
      res.status(200).json({ lessons });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllLesson, getAllEntrolledLesson };
