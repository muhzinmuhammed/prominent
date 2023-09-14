import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';

const adminProtect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    
    const authorizationHeader = req.headers['authorization'];
   
    

    if (!authorizationHeader) {
      throw new Error('Authorization header missing');
    }

    const token: string | undefined = authorizationHeader.split(' ')[1];
   


    if (!token) {
      throw new Error('Token missing in authorization header');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { user_id: string };
   
    

    req.body.userId = decodedToken.user_id;


    const admin='ObjectId(6502229c761cead53ce1099u)'

    if (admin!=req.body.userId) {
      
        
      throw new Error('User not found');
    } else {
      next();
    }
  } catch (err) {
   
    
    res.status(401).json({message:"invlaid"})
    // Optionally, you can log the error for debugging purposes:
    
  }
};

export { adminProtect };
