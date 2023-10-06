import mongoose, { Schema, Document, model, Model } from "mongoose";

interface IREVIEW extends Document {
  studentId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;

  review: string;
  createdAt: Date;
}

const reviewschema = new Schema<IREVIEW>(
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

    review: {
      type: String,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const ReviewModel: Model<IREVIEW> = model<IREVIEW>("review", reviewschema);
export default ReviewModel;
