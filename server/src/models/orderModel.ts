import mongoose, { Schema, Document, model, Model } from "mongoose";

interface IORDER extends Document {
  studentId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  instructorId: mongoose.Schema.Types.ObjectId;

  status: string;

  amount: number;

  createdAt: Date;
  updatedAt: Date;
}

const orderschema = new Schema<IORDER>(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "studentCollection",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
    },
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorcollection",
    },
    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,

      default: "suceess",
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const OrderModel: Model<IORDER> = model<IORDER>("orderModel", orderschema);
export default OrderModel;
