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
exports.getWallet = exports.CourseRefund = void 0;
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const walletModel_1 = __importDefault(require("../../models/walletModel"));
const CourseRefund = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const order = yield orderModel_1.default.findById(id).populate({
            path: 'courseId.coursename',
        });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const wallet = yield walletModel_1.default.findOne({ userId: order.studentId });
        if (wallet) {
            // User has a wallet, create a new wallet transaction and update the balance
            const newWalletTransaction = new walletModel_1.default({
                userId: order.studentId,
                orderId: order._id,
                balance: wallet.balance + order.amount,
                courseId: order.courseId,
            });
            yield newWalletTransaction.save();
        }
        else {
            // User does not have a wallet, create a new wallet
            const newWallet = new walletModel_1.default({
                userId: order.studentId,
                orderId: order._id,
                balance: order.amount,
                courseId: order.courseId,
            });
            yield newWallet.save();
        }
        yield orderModel_1.default.updateOne({ _id: id }, { $set: { status: 'Refund' } });
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.CourseRefund = CourseRefund;
const getWallet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const wallet = yield walletModel_1.default.find({ userId: id })
            .populate("orderId")
            .populate("courseId");
        if (wallet) {
            res.status(200).json({ wallet });
        }
        else {
            res.status(200).json({ message: "mo wallet Amount" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getWallet = getWallet;
