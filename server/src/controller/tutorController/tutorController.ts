import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import instrcutorSchema from "../../models/instructor";
import generateToken from "../../../utlitis/genarateToken";

/*instructor register*/
const instructorSignup = asyncHandler(async (req: Request, res: Response) => {
  console.log("kkk");

  try {
    const { instrctorname, instrctoremail, password, phone } = req.body;
    const userExists = await instrcutorSchema.findOne({ instrctoremail });
    const userPhone = await instrcutorSchema.findOne({ phone });

    if (userExists || userPhone) {
      res.status(400).json({ message: "User already exists" });
    }

    const instructor = await instrcutorSchema.create({
      instrctorname,
      instrctoremail,
      phone,
      password,
    });

    if (instructor) {
      const token = generateToken(instructor._id); // Assuming generateToken function returns a string

      res.status(200).json({
        _id: instructor._id,
        name: instructor.instrctorname,
        email: instructor.instrctoremail,
        phone: instructor.phone,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid instructor data" });
    }
  } catch (error) {
    res.status(500); // Internal server error
    throw error;
  }
});

/*instructor register*/

const loginInstructor = async (req: Request, res: Response) => {
  const { instrctoremail, password } = req.body;

  try {
    const user = await instrcutorSchema.findOne({ instrctoremail }); // Use StudentModel instead of userModel

    if (!user) {
      return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
    }

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      return res.json({
        _id: user._id,
        name: user.instrctorname,
        phone: user.phone,
        email: user.instrctoremail,
        token,
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { instructorSignup, loginInstructor };
