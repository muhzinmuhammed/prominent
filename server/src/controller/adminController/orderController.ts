import { Request,Response } from 'express';
import OrderModel from '../../models/orderModel'

const viewOrder=async(req:Request,res:Response)=>{
    try {
        const order=await OrderModel.find().populate('studentname').populate('coursename').populate('instructor')
       
        if (order) {
            res.status(200).json({order:order})
            
        }else{
            res.status(400).json({message:"haiii"})
        }
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        
    }
}


export{viewOrder}
