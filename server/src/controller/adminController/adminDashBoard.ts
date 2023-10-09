import { Response, Request } from "express";
import StudentModel from "../../models/userModel";
import OrderModel from "../../models/orderModel";
import instrutorModel from "../../models/instructor";
import CourseModel from "../../models/addCourse";

const TotalSales = async (req: Request, res: Response) => {
  try {
    const totalOrderCount = await OrderModel.countDocuments({}).where({
      status: "success",
    });
    const totalUsersCount = await StudentModel.countDocuments({});
    const InsructorCount = await instrutorModel.countDocuments({});
    const CourseCount = await CourseModel.countDocuments({});

    const totalRevenue = await OrderModel.aggregate([
      {
        $match: {
          status: "success",
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

  const tot=totalRevenue[0].total
  
  
   
    
    

    res.status(200).json({
      totalOrderCount,
      totalUsersCount,
      InsructorCount,
      CourseCount,
      tot,
    });
  } catch (error) {
    console.log(error);
  }
};


const totalGraph=async(req:Request,res:Response)=>{
    try {
        const monthlySales = await OrderModel.aggregate([
            {
              $match: {
                status: "success",
                createdAt: {
                  $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                  $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                },
              },
            },
            {
              $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: "$amount" },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ]);

    
      
          res.json(monthlySales);
        
    } catch (error) {
        console.log(error);
        
        
    }
}

export { TotalSales,totalGraph };
