import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import userModel from "../../models/userModel";
import generateToken from "../../../utlitis/genarateToken";
import StudentModel from "../../models/userModel";
import InstructorModel from '../../models/instructor'
import 'dotenv/config';



const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICESID; // Note the corrected variable name



import client from 'twilio'; // Note the corrected import statement

const twilioClient = client(accountSid, authToken);

        


/*student register*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'muhzinsidhiq333@gmail.com',
      pass: 'iiue xtwn lkkf jfps'
    }
  });
  const globalData = {
    otp: null as null | number, // Use type null | number for otp
    user: null as null | { studentname: string, studentemail: string, phone: string, password: string }, // Define a type for user
  };
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

        const user = {
            studentname,
            studentemail,
            phone,
            password,
        };
        
        globalData.user=user

        if (user) {
            const otp: number = parseInt((Math.random() * 1000000).toString(), 10);

// Store the OTP in localStorage with a key
globalData.otp=otp
    

            const mailOptions = {
                from: 'muhzinsidhiq333@gmail.com',
                to: user.studentemail,
                subject: 'Sending Email using Node.js',
              html:  "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" ,
                text: 'That was easy!'

              };

            transporter.sendMail(mailOptions, function (error: any, info: any) {
                if (error) {
                    console.error(error);
                } else {
                    res.status(200).json({user})
                    console.log('Verification sent to your email');
                }
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

const student_singup_verify_otp =async (req: Request, res: Response) =>{
    try {
        const {otp}=req.body
        
        if (otp==globalData.otp) {
          const addUser=  await userModel.create(globalData.user)
            const token = generateToken(addUser._id);
            return res.status(200).json({
                _id: addUser?._id,
                name: addUser?.studentname,
                email: addUser?.studentemail,
                phone:addUser?.phone,
                token,
});
            
        }else{
            res.status(500).json({message:"Wrong otp"})
        }
        
    } catch (error) {
        res.status(400).json({message:'something went wrong'})
    }

}

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






/* get all instrctor*/ 
const instructor=async(req:Request,res:Response) =>{
    const allInstrcutor=await  InstructorModel.find().exec()
    res.status(200).json({
        allInstrcutor
    })
}
/* get all instrctor*/

export {
    studentSignup,
    loginStudent,
    student_singup_verify_otp,
    instructor

};
