import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import categoryModel from '../../models/categoryModel'


/* add category */

const addCategory = asyncHandler(async (req: Request, res: Response) => {
  
    try {
        const { title, description } = req.body;
       

        const categoryExits=await categoryModel.find({title})
        if (categoryExits) {
            res.status(400).json({
                message:'Category alredy exits'
            })
            
        }

        const category = await categoryModel.create({
            title,
            description,
           
        });
        if (category) {
            res.status(200).json({
                title,
                description,

            })
            
        }else {
            res.status(400).json({ message: "Invalid instructor data" })
        }

        
        
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});

/* add category */

/* category*/

const getAllCategory = async (req: Request, res: Response) => {
  console.log("jjj");
  
    try {
      const courseDetails = await categoryModel.find().exec();
      console.log(courseDetails,"kkk");
      
      if (courseDetails) {
        res.status(200).json({
          courseDetails,
        });
      } else {
        return res.status(400).json({
          message: "no users in this table",
        });
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };
/* category*/


export {addCategory,getAllCategory}