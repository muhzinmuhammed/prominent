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
exports.unApprovedCourseByAdmin = exports.approvedCourseByAdmin = exports.getCourses = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addCourse_1 = __importDefault(require("../../models/addCourse"));
require("dotenv/config");
const addCourse_2 = __importDefault(require("../../models/addCourse"));
/* get course */
const getCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield addCourse_1.default
            .find()
            .populate("instructor")
            .populate("category");
        if (courses) {
            res.status(200).json({
                courses,
            });
        }
    }
    catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
}));
exports.getCourses = getCourses;
/* get course */
/*approved course*/
const approvedCourseByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courseApproved = yield addCourse_2.default.findByIdAndUpdate(id, {
            isApproved: true,
        });
        if (!courseApproved) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course approved" });
    }
    catch (error) {
        console.error("Error approving course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.approvedCourseByAdmin = approvedCourseByAdmin;
/*approved course*/
/*unapproved course*/
const unApprovedCourseByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield addCourse_2.default.findByIdAndUpdate(id, {
            isApproved: false,
        });
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        return res.status(200).json({ message: "Course unapproved successfully" });
    }
    catch (error) {
        console.error("Error unapproving course:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unApprovedCourseByAdmin = unApprovedCourseByAdmin;
