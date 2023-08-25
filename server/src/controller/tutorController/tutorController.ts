import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import instrcutorSchema from '../../models/instructor'
import generateToken from "../../../utlitis/genarateToken";



/*instructor register*/
const instructorSignup = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { instrctorname, instrctoremail, password,phone } = req.body;
        const userExists = await instrcutorSchema.findOne({ instrctoremail });
        const userPhone = await instrcutorSchema.findOne({ phone });

        if (userExists||userPhone) {
            res.status(400).json({ message: 'User already exists' });
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
                phone:instructor.phone,
                token,
            });
        } else {
            res.status(400).json({ message: "Invalid instructor data" })
        }
    } catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
});

/*instructor register*/

export{
    instructorSignup
}