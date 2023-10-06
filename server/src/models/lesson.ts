import mongoose, { Schema, Document, model, Model } from "mongoose";

interface ILESSON extends Document {
  title: string;
  courseId: mongoose.Schema.Types.ObjectId;
  duration: number;
  coursedescrption: string;
  isApproved: boolean;
  categoryId: mongoose.Schema.Types.ObjectId;

  video: string[];
  instructorId: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILESSON>(
  {
    title: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseModel",
    },
    duration: {
      type: Number,
      required: true,
    },
    coursedescrption: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorycollection",
      required: true,
    },
    isApproved: {
      type: Boolean,

      default: false,
    },
    video: [
      {
        type: String,
      },
    ],
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorcollection",
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
const LessonModel: Model<ILESSON> = model<ILESSON>("lessonModel", lessonSchema);
export default LessonModel;
