/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import addCourse from "../../models/addCourse";

import "dotenv/config";
import CourseModel from "../../models/addCourse";

/* get course */

const getCourses = asyncHandler(async (req: Request, res: Response) => {
  try {
    const courses = await addCourse
      .find()
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

/* get course */
/*approved course*/

const approvedCourseByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const courseApproved = await CourseModel.findByIdAndUpdate(id, {
      isApproved: true,
    });

    if (!courseApproved) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course approved" });
  } catch (error) {
    console.error("Error approving course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
/*approved course*/

/*unapproved course*/
const unApprovedCourseByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course = await CourseModel.findByIdAndUpdate(id, {
      isApproved: false,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course unapproved successfully" });
  } catch (error) {
    console.error("Error unapproving course:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*unapproved course*/

export { getCourses, approvedCourseByAdmin, unApprovedCourseByAdmin };
