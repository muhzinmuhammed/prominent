import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import * as dotenv from "dotenv";
import { Document } from "mongoose";
dotenv.config();

interface CustomUser {
  _id: string;
  username: string;
  user: any | null;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: CustomUser;
    }
  }
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Use optional chaining to handle potential undefined headers
    const JWT_SECRET = process.env.JWT_SECRET as string; // Assuming JWT_SECRET is a string in your .env file

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        const userId: string = decoded.user_id;

        const user: Document | null = await User.findById(userId).select(
          "-password"
        );

        if (user) {
          req.user = user as unknown as CustomUser;
          next();
        } else {
          res.status(404);
          throw new Error("User not found");
        }
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }

    if (!token) {
      res.status(401);
    }
  }
);

export { protect };
