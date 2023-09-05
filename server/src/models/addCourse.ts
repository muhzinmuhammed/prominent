
import mongoose, { Schema, Document, model, Model } from 'mongoose';


interface ICOURSE extends Document {
    coursename: string;
    courseduration: number;
    coursedescrption: string;
    isApproved:boolean;
    category:mongoose.Schema.Types.ObjectId;

   
    photo: string[];
    instructor: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
   
}

const courseSchema = new Schema<ICOURSE>({
    coursename: {
        type: String,
        required: true,
    },
    courseduration: {
        type: Number,
        required: true,
        
    },
    coursedescrption: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'categorycollection',
        required: true,
    },
    isApproved:{
        type:Boolean,
        
        default:false

    },
    photo: [{
        type: String,
    }],
    
   
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
}, { timestamps: true });



// Define the model using the model function and export it
const CourseModel: Model<ICOURSE> = model<ICOURSE>('courseModel', courseSchema);
export default CourseModel;