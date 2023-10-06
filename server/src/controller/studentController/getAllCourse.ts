import { Request, Response } from "express";

import CourseModel from "../../models/addCourse";
import OrderModel from "../../models/orderModel";

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const allCourse = await CourseModel.find().where({ isApproved: true });

    if (allCourse) {
      res.status(200).json({ allCourse });
    } else {
      res.status(400).json({ message: "not valid" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ messga: "internal server problem" });
  }
};

const entrolledCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const entrolledCourse = await OrderModel.find({ studentId: id })
      .populate("studentId")
      .populate("instructorId")
      .populate("courseId");

    res.status(200).json({ entrolled: entrolledCourse });
  } catch (error) {
    console.log(error);
  }
};

const entrolledCourseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const entrolledCourse = await OrderModel.find({ _id: id })
      .populate("studentId")
      .populate("instructorId")
      .populate("courseId");

    res.status(200).json({ entrolled: entrolledCourse });
  } catch (error) {
    console.log(error);
  }
};

export { getAllCourses, entrolledCourse, entrolledCourseDetails };
