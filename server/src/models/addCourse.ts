import mongoose, { Schema, Document, model, Model } from "mongoose";

enum CourseLevel {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

interface ICourse extends Document {
  coursename: string;
  courseduration: Date;
  coursedescription: string;
  isApproved: boolean;
  category: mongoose.Schema.Types.ObjectId;
  coursefee: number;
  rating: {
    start: number;
    postedby: mongoose.Schema.Types.ObjectId;
  }[];
  totalRating: string | number;
  courseLevel: CourseLevel;
  photo: string[];
  instructor: mongoose.Schema.Types.ObjectId;
  courseLessons:string[];
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    coursename: {
      type: String,
      required: true,
    },
    courseduration: {
      type: Date,
      required: true,
    },
    coursedescription: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categorycollection", // Replace with your actual category collection name
      required: true,
    },
    coursefee: {
      type: Number,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    courseLevel: {
      type: String,
      enum: Object.values(CourseLevel),
      required: true,
    },
    photo: [
      {
        type: String,
      },
    ],
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorcollection", // Replace with your actual instructor collection name
      required: true,
    },
    rating: [
      {
        start: Number,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "studentCollection", // Replace with your actual student collection name
        },
      },
    ],
    courseLessons: [
        {
          title: {
            type: String,
            required: true,
          },
          duration: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          video: {
            type: String,
            required: true,
          },
          
          isActive: {
            type: Boolean,
            required: true,
            default: true,
          },
        },
      ],
    totalRating: {
      type: Number, // Change the type to Number
      default: 0,
    },
  },
  { timestamps: true }
);

// Define the model using the model function and export it
const CourseModel: Model<ICourse> = model<ICourse>("Course", courseSchema);
export default CourseModel;
