import { Schema, Document, Model, model } from "mongoose";

interface IWallet extends Document {
  userId: Schema.Types.ObjectId;
  orderId: Schema.Types.ObjectId;
  courseId: Schema.Types.ObjectId;
  balance: number;

  createdAt: Date;
}

const walletSchema: Schema<IWallet> = new Schema<IWallet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "studentCollection",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "orderModel",
  },
  balance: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Wallet: Model<IWallet> = model<IWallet>("wallet", walletSchema);

export default Wallet;
