import { Request, Response } from "express-serve-static-core";
import CourseModel from "../../models/addCourse";
import OrderModel from "../../models/orderModel";

const totalCount = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const totalCountCourse = await CourseModel.find({
      instructor: id,
    }).countDocuments();
    const EntrolledCourses = await OrderModel.find({
      instructorId: id,
    }).countDocuments();

    const students = await OrderModel.find({ instructorId: id }).populate(
      "studentId"
    );

    const studentNames = students.map((order) => order.studentId); // Assuming 'name' is the property you want to extract

    const studentCount = new Set(studentNames).size;

    res.json({ totalCountCourse, EntrolledCourses, studentCount });
  } catch (error) {
    console.log(error);
  }
};

export { totalCount };
