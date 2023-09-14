import { Request, Response } from "express";
import userModel from "../../models/userModel";
import categoryModel from '../../models/categoryModel'

import instructorModel from "../../models/instructor";
import generateToken from "../../../utlitis/genarateToken";

/*admin login*/
const loginAdmin = async (req: Request, res: Response) => {
  try {
    
    
    const adminEmail = "admin@gmail.com";
    const adminpassword = 123456;
    const id='ObjectId(6502229c761cead53ce1099u)'
    const { adminname, password } = req.body;
   
    

    if (adminEmail == adminname && adminpassword == password) {
      const token = generateToken(id)
    
      
      return res.status(200).json({
       id,
       adminEmail,
       token

      });
    } else {
      return res.status(400).json({
        message: "please correct code",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
/*admin login*/

/*get all student*/

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const studentDetails = await userModel.find().exec();
    if (studentDetails) {
      res.status(200).json({
        studentDetails,
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

/*get all student*/

//* get all instructors* */
const getAllInstructor = async (req: Request, res: Response) => {
  try {
    const instructorDetails = await instructorModel.find().exec();
    if (instructorDetails) {
      res.status(200).json({
        instructorDetails,
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
//* get all instructors* */
//* get all instructors* */
const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categoryDetails = await categoryModel.find().exec();
    if (categoryDetails) {
      res.status(200).json({
        categoryDetails,
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
//* get all instructors* */

/*block student*/

const blockStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const userToBlock = await userModel.findById(id);

    if (!userToBlock) {
      return res.status(404).json({ message: "User not found" });
    }

    userToBlock.isBlocked = true; // Set the 'isBlocked' property to true
    await userToBlock.save();

    return res.status(200).json({ message: "User blocked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}; /*block student*/

/*unblock student*/
const unBlockStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(id);
    

    const userToBlock = await userModel.findById(id);

    if (!userToBlock) {
      return res.status(404).json({ message: "User not found" });
    }

    userToBlock.isBlocked = false; // Set the 'isBlocked' property to true
    await userToBlock.save();

    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/*unblock student*/

export {
  loginAdmin,
  getAllStudent,
  getAllInstructor,
  blockStudent,
  unBlockStudent,
  getAllCategory
};
