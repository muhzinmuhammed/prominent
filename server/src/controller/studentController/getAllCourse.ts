import { Request, Response } from "express";

import CourseModel from '../../models/addCourse'

const getAllCourses=async(req:Request,res:Response)=>{
    try {
        const allCourse=await CourseModel.find().where({isApproved:true})
        if (allCourse) {
            res.status(200).json({allCourse})
            
        }else{
            res.status(400).json({message:"not valid"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({messga:"internal server problem"})
        
        
    }
}

export {getAllCourses}