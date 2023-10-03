
import mongoose, { Schema, Document, model, Model, Date } from 'mongoose';


interface ICOURSE extends Document {
    coursename: string;
    courseduration: Date;
    coursedescrption: string;
    isApproved:boolean;
    category:mongoose.Schema.Types.ObjectId;
    coursefee:number;
    rating:string;
    totalRating:string |number

    

   
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
        type: Date,
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
    coursefee:{
        type:Number,
        required:true
    },
    isApproved:{
        type:Boolean,
        
        default:false

    },
    photo: [{
        type: String,
    }],
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"instructorcollection",
        required:true

    },
    rating:[{

        start:Number,
    postedby:{type:mongoose.Schema.Types.ObjectId,ref:'studentCollection'}


    }],
    totalRating:{
        type:String,
        default:0

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
const CourseModel: Model<ICOURSE> = model<ICOURSE>('courseModel', courseSchema);
export default CourseModel;