import { Request, Response } from "express-serve-static-core";
import OrderModel from "../../models/orderModel";
import WalletModel from "../../models/walletModel";

const CourseRefund = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id).populate({
      path: 'courseId.coursename',
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const wallet = await WalletModel.findOne({ userId: order.studentId });

    if (wallet) {
      // User has a wallet, create a new wallet transaction and update the balance
      const newWalletTransaction = new WalletModel({
        userId: order.studentId,
        orderId: order._id,
        balance: wallet.balance + order.amount,
        courseId: order.courseId,
      });

      await newWalletTransaction.save();
    } else {
      // User does not have a wallet, create a new wallet
      const newWallet = new WalletModel({
        userId: order.studentId,
        orderId: order._id,
        balance: order.amount,
        courseId: order.courseId,
      });

      await newWallet.save();
    }

    await OrderModel.updateOne({ _id: id }, { $set: { status: 'Refund' } });

    res.status(200).json({ message: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getWallet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const wallet = await WalletModel.find({ userId: id })
      .populate("orderId")
      .populate("courseId");

    if (wallet) {
      res.status(200).json({ wallet });
    } else {
      res.status(200).json({ message: "mo wallet Amount" });
    }
  } catch (error) {
    console.log(error);
  }
};
export { CourseRefund, getWallet };
