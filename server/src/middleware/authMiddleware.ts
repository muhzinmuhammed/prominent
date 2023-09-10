
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User, { UserDocument } from '../models/userModel'; // Make sure to import your User model with the appropriate type
import * as dotenv from 'dotenv'
dotenv.config()
interface CustomUser {
  // Define the properties you have in your custom user type here
  _id: string;
  username: string;
  // Add other properties as needed
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET); // You might want to replace 'any' with the actual type of your decoded JWT
      const userId: string = decoded.userId; // Assuming userId is a string in your User model

      const user: UserDocument | null = await User.findById(userId).select('-password');
      
      if (user) {
        // Assuming your UserDocument has properties matching your custom user type
        req.user = user as CustomUser;
        next();
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }

  if (!token) {
    res.status(401);
    
    
  }
});

export { protect };
