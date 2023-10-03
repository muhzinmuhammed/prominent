import { Request,Response } from "express-serve-static-core";
import OrderModel from "../../models/orderModel";
import WalletModel from "../../models/walletModel";


const CourseRefund=async(req:Request,res:Response)=>{
 
    
  
    try {
        const { id } = req.params;
        
        
      const order = await OrderModel
        .findById(id)
        .populate({ path: "courseId.coursename" });
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const wallet = await WalletModel.findOne({ userId: order.studentId });
  
      if (wallet) {
        
        wallet.balance += order.amount;
       
  
        await wallet.save();
      } else {
        // User's wallet does not exist, create a new wallet
        const newWallet = new WalletModel({
          userId: order.studentId,
          orderId: order._id,
          balance: order.amount,
         
        });
  
        await newWallet.save();
      }
  
      await OrderModel.updateOne({ _id: id }, { $set: { status: "Refund", } });
  
  
     res.status(200).json({message:'success'})
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  
}

export{CourseRefund}
