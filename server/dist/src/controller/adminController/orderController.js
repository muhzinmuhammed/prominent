"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewOrder = void 0;
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const viewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderModel_1.default.find()
            .populate("studentId")
            .populate("courseId")
            .populate("instructorId");
        if (order) {
            res.status(200).json({ order: order });
        }
        else {
            res.status(400).json({ message: "haiii" });
        }
    }
    catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
    }
});
exports.viewOrder = viewOrder;
