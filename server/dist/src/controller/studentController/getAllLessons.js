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
exports.getAllEntrolledLesson = exports.getAllLesson = void 0;
const addCourse_1 = __importDefault(require("../../models/addCourse"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const getAllLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the course by its ID
        const course = yield addCourse_1.default.findById(id)
            .populate("category")
            .populate("instructor");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        // Find all lessons with the same course_id
        if (course) {
            res.status(200).json({ course });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllLesson = getAllLesson;
const getAllEntrolledLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the course by its ID
        const lessons = yield orderModel_1.default.findById(id)
            .populate("courseId")
            .populate("instructorId");
        if (!lessons) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (lessons) {
            res.status(200).json({ lessons });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllEntrolledLesson = getAllEntrolledLesson;
