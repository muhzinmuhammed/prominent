import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../../models/userModel";
import generateToken from "../../../utlitis/genarateToken";

import InstructorModel from "../../models/instructor";
import "dotenv/config";
import StudentModel from "../../models/userModel";
import { sendMail } from "../../middleware/mailSender";

/*student register*/

const globalData = {
  otp: null as null | number, // Use type null | number for otp
  user: null as null | {
    studentname: string;
    studentemail: string;
    phone: string;
    password: string;
  }, // Define a type for user
};
const studentSignup = async (req: Request, res: Response) => {
  try {
    const { studentname, studentemail, password, phone } = req.body;

    if (!studentname || !studentemail || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await userModel.findOne({ studentemail });
    const userPhone = await userModel.findOne({ phone });

    if (userExists || userPhone) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = {
      studentname,
      studentemail,
      phone,
      password,
    };

    globalData.user = user;

    if (user) {
      const mail = sendMail(user.studentemail, res);
      globalData.otp = mail;
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
};

/*student register*/

const student_singup_verify_otp = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;

    if (otp == globalData.otp) {
      const addUser = await userModel.create(globalData.user);
      const token = generateToken(addUser._id);
      return res.status(200).json({
        _id: addUser?._id,
        name: addUser?.studentname,
        email: addUser?.studentemail,
        phone: addUser?.phone,
        token,
      });
    } else {
      res.status(500).json({ message: "Wrong otp" });
    }
  } catch (error) {
    res.status(400).json({ message: "something went wrong" });
  }
};

/*student login*/

const loginStudent = async (req: Request, res: Response) => {
  const { studentemail, password } = req.body;

  try {
    const user = await userModel
      .findOne({ studentemail })
      .where({ isBlocked: false });

    // Use StudentModel instead of userModel

    if (!user) {
      return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
    }
    if (user?.isBlocked == true) {
      return res.status(401).json({ message: "User is Blocked" });
    }

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.json({
        _id: user._id,
        name: user.studentname,
        phone: user.phone,
        email: user.studentemail,
        isBlocked: user.isBlocked,
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
const instructor = async (req: Request, res: Response) => {
  const allInstrcutor = await InstructorModel.find().exec();
  res.status(200).json({
    allInstrcutor,
  });
};
/* get all instrctor*/

/* get all students*/
const allUsers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const users = await StudentModel.find({ _id: { $ne: id } });

    return res.json(users).status(200);
  } catch (error) {
    console.log(error);
  }
};
/* get all students*/

/* forget password*/
const forgetData = {
  otp: null as null | number,
};
const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { studentemail } = req.body;
    const userExists = await userModel.findOne({ studentemail });
    if (userExists) {
      const otp = sendMail(studentemail, res);
      forgetData.otp = otp;
    } else {
      return res.status(400).json({ message: "no user " });
    }
  } catch (error) {
    console.log(error);
  }
};

/* forget password*/

/* verify otp*/

const verifyForgetPassword = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    if (otp == forgetData.otp) {
      return res.status(200).json({ message: "success" });
    } else {
      return res.status(400).json({ message: "please correct passowrd" });
    }
  } catch (error) {
    console.log(error);
  }
};

/* verify otp*/

/* new password */
const newPassword = async (req: Request, res: Response) => {
  try {
    const { studentemail, password } = req.body;
    userModel.findOne({ studentemail: studentemail }).then((user) => {
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while hashing the password",
          });
        } else {
          userModel
            .findOneAndUpdate(
              { studentemail: studentemail },
              { password: hash }
            )
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update user with ID: ${studentemail}. User not found.`,
                });
              } else {
                res.status(200).send({
                  message: "Successfully updated password",
                });
              }
            })
            .catch((err) => {
              res
                .status(500)
                .send({ message: "Error updating user information" });
            });
        }
      });
    });
  } catch (error) {
    console.log(error);
    // Handle other errors if needed
    res.status(500).send({ message: "An error occurred" });
  }
};

/* new password */

export {
  studentSignup,
  loginStudent,
  student_singup_verify_otp,
  instructor,
  allUsers,
  forgetPassword,
  verifyForgetPassword,
  newPassword,
};
