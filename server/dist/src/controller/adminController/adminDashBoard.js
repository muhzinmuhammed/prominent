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
exports.totalGraph = exports.TotalSales = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const instructor_1 = __importDefault(require("../../models/instructor"));
const addCourse_1 = __importDefault(require("../../models/addCourse"));
const TotalSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalOrderCount = yield orderModel_1.default.countDocuments({}).where({
            status: "success",
        });
        const totalUsersCount = yield userModel_1.default.countDocuments({});
        const InsructorCount = yield instructor_1.default.countDocuments({});
        const CourseCount = yield addCourse_1.default.countDocuments({});
        const totalRevenue = yield orderModel_1.default.aggregate([
            {
                $match: {
                    status: "success",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);
        const tot = totalRevenue[0].total;
        res.status(200).json({
            totalOrderCount,
            totalUsersCount,
            InsructorCount,
            CourseCount,
            tot,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.TotalSales = TotalSales;
const totalGraph = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlySales = yield orderModel_1.default.aggregate([
            {
                $match: {
                    status: "success",
                    createdAt: {
                        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                        $lt: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        res.json(monthlySales);
    }
    catch (error) {
        console.log(error);
    }
});
exports.totalGraph = totalGraph;
