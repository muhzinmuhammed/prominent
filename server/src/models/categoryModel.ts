
import  { Schema, Document, model, Model } from 'mongoose';


interface ICATEGORY extends Document {
    title: string;
    description: string;
    
   
    photo: string[];
 
    createdAt: Date;
    updatedAt: Date;
   
}

const instrcutorSchema = new Schema<ICATEGORY>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        unique: true, // Add unique constraint
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
const CourseModel: Model<ICATEGORY> = model<ICATEGORY>('categorycollection', instrcutorSchema);
export default CourseModel;