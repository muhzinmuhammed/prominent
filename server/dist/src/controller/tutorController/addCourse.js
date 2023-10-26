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
exports.editCoursePage = exports.editCourse = exports.getCourses = exports.addCourses = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addCourse_1 = __importDefault(require("../../models/addCourse"));
/* add course */
const addCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursename, courseduration, coursedescription, category, instructor, photo, coursefee, courseLevel, } = req.body;
        console.log(req.body);
        const Course = yield addCourse_1.default.create({
            coursename,
            courseduration,
            coursedescription,
            category,
            instructor,
            photo,
            coursefee,
            courseLevel,
        });
        if (Course) {
            res.status(200).json({
                coursename,
                courseduration,
                coursedescription,
                category,
                instructor,
                photo,
                coursefee,
                courseLevel,
            });
        }
        else {
            res.status(400).json({ message: "Invalid instructor data" });
        }
    }
    catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
}));
exports.addCourses = addCourses;
/* add course */
/* get all courses*/
const getCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courses = yield addCourse_1.default
            .find({ instructor: id })
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
/* get all courses*/
/* edit page */
const editCoursePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const editCourse = yield addCourse_1.default.findById(id);
        if (editCourse) {
            res.status(200).json({
                editCourse,
            });
        }
        else {
            res.status(400).json({ message: "No course" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server" });
    }
});
exports.editCoursePage = editCoursePage;
/* edit page * /

/* update courses */
const editCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { coursename, courseduration, coursedescrption, category, coursefee, } = req.body;
        const course = yield addCourse_1.default.findById(id);
        if (!course) {
            // Handle the case where the course with the given ID is not found.
            return res.status(404).json({ message: "Course not found" });
        }
        else {
            const updateCourse = yield addCourse_1.default.findByIdAndUpdate(id, {
                coursename,
                courseduration,
                coursedescrption,
                category,
                coursefee,
            }, { new: true });
            res.status(200).json({
                updateCourse,
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.editCourse = editCourse;
