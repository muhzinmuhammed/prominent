import mongoose, { Document, Model, Schema } from "mongoose";
 // Replace with the actual user model file

interface IChat extends Document {
  chatName: string;
  isGroupChat: boolean;
  users: mongoose.Schema.Types.ObjectId;
  latestMessage: mongoose.Schema.Types.ObjectId;
  groupAdmin: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "studentCollection" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "studentCollection" },
  },
  { timestamps: true }
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
