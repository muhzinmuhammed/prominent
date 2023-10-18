import { Request, Response } from "express";
import OrderModel from "../../models/orderModel";

const viewOrderInTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const orders = await OrderModel.find({ instructorId: id })
      .populate("courseId")
      .populate("studentId");

    if (orders) {
      res.status(200).json({ order: orders });
    } else {
      res.status(400).json({ message: "No order" });
    }
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

export { viewOrderInTutor };
