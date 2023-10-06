import { Request, Response, NextFunction } from "express";

import categoryModel from "../../models/categoryModel";

const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;

    const categoryExists = await categoryModel.findOne({
      title: { $regex: new RegExp(title, "i") },
    });

    if (categoryExists) {
      console.log("kk");

      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await categoryModel.create({
      title,
      description,
    });

    if (category) {
      console.log(title, "created");
      res.status(201).json({
        title,
        description,
      });
    } else {
      res.status(400).json({ message: "Invalid category data" });
    }
  } catch (error) {
    next(error); // Pass the error to the Express error handling middleware
  }
};

export { addCategory };
