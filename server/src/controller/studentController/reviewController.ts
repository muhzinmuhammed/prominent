import { Request, Response } from "express-serve-static-core";
import ReviewModel from "../../models/reviewModel";
import OrderModel from "../../models/orderModel";

const addReview = async (req: Request, res: Response) => {
  try {
    const { studentId, courseId, review } = req.body;
    const addreviews = new ReviewModel({
      studentId,
      courseId,
      review,
    });
    addreviews.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

const getReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await OrderModel.findById(id);
    const courseId = course?.courseId;

    const review = await ReviewModel.find({ courseId: courseId }).populate(
      "studentId",
      "-password"
    );

    return res.status(200).json({ review });
  } catch (error) {
    console.log(error);
  }
};

export { addReview, getReview };
