import { Schema, Document, Model, model } from 'mongoose';

interface IWallet extends Document {
  userId: Schema.Types.ObjectId;
  orderId?: Schema.Types.ObjectId;
  balance: number;
  transactions: string[];
}

const walletSchema: Schema<IWallet> = new Schema<IWallet>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'studentCollection',
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'orderModel',
  },
  balance: {
    type: Number,
    required: true,
  },
  
});

const Wallet: Model<IWallet> = model<IWallet>('wallet', walletSchema);

export default Wallet;
