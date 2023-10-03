import { Request,Response } from "express-serve-static-core";
import ReviewModel from "../../models/reviewModel";


const addReview=async(req:Request,res:Response)=>{
    console.log(req.body);
    
    
    try {
        console.log(req.body);
        
        
        const {studentId,courseId,review}=req.body
        const addreviews=new ReviewModel({
            studentId,
            courseId,
            review

        })
        addreviews.save()
        res.status(200).json({message:"success"})
    } catch (error) {
        console.log(error);
        
        
    }
}

const getReview=async(req:Request,res:Response)=>{
    

    try {
    
    
       
       
        
        const courseId = req.params.courseId; // Extract courseId from req.params
    
        
        const review=await ReviewModel.find({courseId:courseId}).populate('studentId','-password')
       
        return res.status(200).json({review})

        
        
    } catch (error) {
        console.log(error);
        
        
    }
}

export {addReview,getReview}