
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import addCourse from '../../models/addCourse';
import {cloudinaryV} from '../../../utlitis/cloudinary'

import { v2 as cloudinaryV2 } from 'cloudinary';
import 'dotenv/config';




/* add course */


const adminAddCourses = asyncHandler(async (req: Request, res: any) => {
  try {
    // Now req.file should be defined because multer has handled the file upload.
    const { coursename, courseduration, coursedescrption, category, instructor,photo } = req.body;
    
    
    
    
    // Upload the photo to Cloudinary
   

    const Course = await addCourse.create({
      coursename,
      courseduration,
      coursedescrption,
      category,
      instructor,
      
    });

    if (Course) {
      res.status(200).json({
        coursename,
        courseduration,
        coursedescrption,
        category,
        
        instructor,
      });
    } else {
      return res.status(400).json({ error: "Error creating the course" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

/* add course */





export { adminAddCourses };
