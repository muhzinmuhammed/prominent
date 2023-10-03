import { addMessage, getMessages } from '../../controller/ChatController/chatController'
import express from 'express'
const chatRouter = express.Router();

chatRouter.post("/addmsg/", addMessage);
chatRouter.post("/getmsg/", getMessages);

export default chatRouter