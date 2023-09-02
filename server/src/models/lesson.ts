
import mongoose, { Schema, Document, model, Model } from 'mongoose';


interface ILESSON extends Document {
    title:string;
    coursename: mongoose.Schema.Types.ObjectId;
    duration: number;
    coursedescrption: string;
    isApproved:boolean;
    category:mongoose.Schema.Types.ObjectId;
    

   
    video: string[];
    instructor: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
   
}

const lessonSchema = new Schema<ILESSON>({
    title:{
        type:String,
        required:true
    },
    coursename: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'courseModel',
        
    },
   duration: {
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
    video: [{
        type: String,
    }],
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'instructorcollection',
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
}, { timestamps: true });



// Define the model using the model function and export it
const LessonModel: Model<ILESSON> = model<ILESSON>('lessonModel', lessonSchema);
export default LessonModel;