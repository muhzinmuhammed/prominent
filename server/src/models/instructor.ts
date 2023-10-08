import bcrypt from "bcrypt";
import mongoose, { Schema, Document, model, Model } from "mongoose";

interface ITUTOR extends Document {
  instrctorname: string;
  instrctoremail: string;
  phone: number;
  password: string;
  photo: string[];
  courses: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const instrcutorSchema = new Schema<ITUTOR>(
  {
    instrctorname: {
      type: String,
      required: true,
    },
    instrctoremail: {
      type: String,
      required: true,
      unique: true, // Add unique constraint
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photo: [
      {
        type: String,
      },
    ],
    courses: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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

instrcutorSchema.methods.matchPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

instrcutorSchema.pre<ITUTOR>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Define the model using the model function and export it
const StudentModel: Model<ITUTOR> = model<ITUTOR>(
  "instructorcollection",
  instrcutorSchema
);
export default StudentModel;
