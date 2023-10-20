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
exports.entrolledCourseDetails = exports.entrolledCourse = exports.getAllCourses = void 0;
const addCourse_1 = __importDefault(require("../../models/addCourse"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourse = yield addCourse_1.default.find().populate('instructor').where({ isApproved: true });
        if (allCourse) {
            res.status(200).json({ allCourse });
        }
        else {
            res.status(400).json({ message: "not valid" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ messga: "internal server problem" });
    }
});
exports.getAllCourses = getAllCourses;
const entrolledCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const entrolledCourse = yield orderModel_1.default.find({ studentId: id })
            .populate("studentId")
            .populate("instructorId")
            .populate("courseId");
        res.status(200).json({ entrolled: entrolledCourse });
    }
    catch (error) {
        console.log(error);
    }
});
exports.entrolledCourse = entrolledCourse;
const entrolledCourseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const entrolledCourse = yield orderModel_1.default.find({ _id: id })
            .populate("studentId")
            .populate("instructorId")
            .populate("courseId");
        res.status(200).json({ entrolled: entrolledCourse });
    }
    catch (error) {
        console.log(error);
    }
});
exports.entrolledCourseDetails = entrolledCourseDetails;
