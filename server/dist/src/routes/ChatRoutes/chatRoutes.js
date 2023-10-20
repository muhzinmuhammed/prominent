"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../../controller/ChatController/chatController");
const express_1 = __importDefault(require("express"));
const chatRouter = express_1.default.Router();
chatRouter.post("/addmsg/", chatController_1.addMessage);
chatRouter.post("/getmsg/", chatController_1.getMessages);
exports.default = chatRouter;
