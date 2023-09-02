import { Request, Response } from "express";

import userModel from "../../models/userModel";
import generateToken from "../../../utlitis/genarateToken";
        


/*student register*/
const studentSignup = async (req: Request, res: Response) => {
   
    try {
        const { studentname, studentemail, password, phone } = req.body;
      
        if (!studentname || !studentemail || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userExists = await userModel.findOne({ studentemail });
        const userPhone = await userModel.findOne({ phone });

        if (userExists || userPhone) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await userModel.create({
            studentname,
            studentemail,
            phone,
            password,
        });

        if (user) {
            const token = generateToken(user._id);
            return res.status(201).json({
                _id: user._id,
                name: user.studentname,
                email: user.studentemail,
                phone,
                token,
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred' });
    }
};
/*student register*/

/*student login*/
const loginStudent = async (req: Request, res: Response) => {
    const { studentemail, password } = req.body;

    try {
        const user = await userModel.findOne({ studentemail });
       
         // Use StudentModel instead of userModel
        
        if (!user) {
            return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
        }
        if (user?.isBlocked==true) {
            return res.status(401).json({ message: "User is Blocked" });
            
        }

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);

            return res.json({
                _id: user._id,
                name: user.studentname,
                phone: user.phone,
                email: user.studentemail,
                isBlocked:user.isBlocked,
                token,
            });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
  
/*student login*/

export {
    studentSignup,
    loginStudent
};
