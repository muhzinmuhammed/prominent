import MessageModel from "../../models/MessageModel";
import { Request,Response } from "express-serve-static-core";

const getMessages=async(req:Request,res:Response)=>{
    try {
        
        
        const { from, to } = req.body;
        
    
        const messages = await MessageModel.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (error) {
        console.log(error);
        
      }
}


const addMessage=async(req:Request,res:Response)=>{
    try {
       
        
       
        const { from, to, message } = req.body;
       
        const data = await MessageModel.create({
          message: { text: message },
          users: [from, to],
          sender: from,
        });
    
        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
      } catch (error) {
       console.log(error);
       
      }
}


export{getMessages,addMessage}