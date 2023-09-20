
import mongoose, { Schema, Document, model, Model } from 'mongoose';


interface IORDER extends Document {
    studentname:mongoose.Schema.Types.ObjectId
    coursename: mongoose.Schema.Types.ObjectId;
    instructor:mongoose.Schema.Types.ObjectId
  
    status:boolean;
   
    amount:number;



    createdAt: Date;
    updatedAt: Date;

}

const orderschema = new Schema<IORDER>({
    studentname:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'studentCollection'
    },
    coursename: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'courseModel',
        
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'instructorcollection',

    },
amount: {
        type: Number,
        required: true,
        
    },
    
   
    status:{
        type:Boolean,
        
        default:true

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
const OrderModel: Model<IORDER> = model<IORDER>('orderModel', orderschema);
export default OrderModel;