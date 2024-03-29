import mongoose from 'mongoose'
import * as dotenv from 'dotenv';
mongoose.set('strictQuery',true)

dotenv.config();


async function connectToDb() {
    const URI:string = process.env.MONGO_URI??""
    
   
    try {
        await mongoose.connect(URI);
        console.log('====================================');
        console.log("conncted");
        console.log('====================================');
        
    } catch (error) {
        console.error(error)
    }
}
// const connectDB= mongoose.connect(process.env.MONGO_URI!)
// .then(()=>{
//     console.log("connected");
// })
// .catch((err)=>{

//     console.log(err);

// })

export default connectToDb