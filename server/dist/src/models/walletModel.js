"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "studentCollection",
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
    },
    orderId: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "orderModel",
        }],
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
const Wallet = (0, mongoose_1.model)("wallet", walletSchema);
exports.default = Wallet;
