import jwt from 'jsonwebtoken';
import TutorModel from '../models/instructor';
import { Request, Response, NextFunction } from 'express';

const tutorProtect = async (req: Request, res: Response, next: NextFunction) => {
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

    const tutor = await TutorModel.findById(req.body.userId);

    if (!tutor) {
      throw new Error('User not found');
    } else {
      next();
    }
  } catch (err) {
   
    
    res.status(401).redirect('/tutor_login');
    // Optionally, you can log the error for debugging purposes:
    
  }
};

export { tutorProtect };
