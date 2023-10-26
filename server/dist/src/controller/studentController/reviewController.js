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
exports.getReview = exports.addReview = void 0;
const reviewModel_1 = __importDefault(require("../../models/reviewModel"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId, review } = req.body;
        const addreviews = new reviewModel_1.default({
            studentId,
            courseId,
            review,
        });
        addreviews.save();
        res.status(200).json({ message: "success" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addReview = addReview;
const getReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield orderModel_1.default.findById(id);
        const courseId = course === null || course === void 0 ? void 0 : course.courseId;
        const review = yield reviewModel_1.default.find({ courseId: courseId }).populate("courseId").populate('studentId');
        return res.status(200).json({ review });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getReview = getReview;
