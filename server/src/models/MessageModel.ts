import mongoose, { Document, Schema, Types } from "mongoose";

interface IMessage extends Document {
  message: {
    text: string;
  };
  users: Types.Array<string>;
  sender: Types.ObjectId;
}

const MessageSchema = new Schema<IMessage>(
  {
    message: {
      text: { type: String, required: true },
    },
    users: [String],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "studentCollection",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<IMessage>("Messages", MessageSchema);

export default MessageModel;
