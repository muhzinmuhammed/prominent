import { Request, Response } from "express";
import OrderModel from "../../models/orderModel";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import CourseModel from "../../models/addCourse";

dotenv.config();

const orderDetails = async (req: Request, res: Response) => {
  try {
   const {coursename,studentname} =req.body
   const course = await OrderModel.findOne({ courseId: coursename, studentId:studentname });
  
  
   if (course) {
    return res.status(400).json({message:'course alredy buying'})
    
  }
   
  
    
    const instance = new Razorpay({
      key_id: process.env.KEY_ID || "",
      key_secret: process.env.KEY_SECRET || "",
    });

    const options = {
      amount: req.body.amount * 100, // Amount should be in paisa (hence, multiplied by 100)
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }

      res.status(200).json({ data: order });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Bad request" }); // Proper response for a bad request
  }
};
const verifyOrder = async (req: Request, res: Response) => {
  try {
    const { response, amount, coursename, studentname } = req.body;

    const course_id = await CourseModel.findById({ _id: coursename });

    const tutor_id = course_id?.instructor;

    const sign =
      response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET || "")
      .update(sign)
      .digest("hex");

    if (response.razorpay_signature === expectedSign) {
      const real = amount / 100;

      // Assuming you have a mongoose OrderModel defined

      await OrderModel.create({
        amount: real,
        studentId: studentname,
        courseId: coursename,
        instructorId: tutor_id,
      });

      return res.status(200).json({ message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { orderDetails, verifyOrder };
