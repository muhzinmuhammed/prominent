import { Request,Response } from "express";
import userModel from '../../models/userModel'

import instructorModel from '../../models/instructor'


/*admin login*/
const loginAdmin = async (req: Request, res: Response) => {
   

    try {
        const adminEmail ="admin@gmail.com"
        const adminpassword=123456
       const  { adminname, password } = req.body;
    
       if (adminEmail==adminname&&adminpassword==password) {
        return res.status(200).json({
            message:"suuceessfull login"
    
        })
        
       }else{
        return res.status(400).json({
            message:"please correct code"
    
        })

       }
        
        

       
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
/*admin login*/

/*get all student*/

const getAllStudent = async (req: Request, res: Response) => {
    try {
        const studentDetails=await userModel.find().exec()
    if (studentDetails) {
        res.status(200).json({
            studentDetails

        })
        
    }else{
        return res.status(400).json({
            message:"no users in this table"
        })
    }
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        
    }
   

        
        

       
}



/*get all student*/


//* get all instructors* */
const getAllInstructor = async (req: Request, res: Response) => {
    try {
        const instructorDetails=await instructorModel.find().exec()
    if (instructorDetails) {
        res.status(200).json({
            instructorDetails

        })
        
    }else{
        return res.status(400).json({
            message:"no users in this table"
        })
    }
        
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        
    }
   

        
        

       
}
//* get all instructors* */

export{
    loginAdmin,getAllStudent,getAllInstructor
}