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
exports.getTutor = exports.getLesson = exports.addLesson = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const instructor_1 = __importDefault(require("../../models/instructor"));
const addCourse_1 = __importDefault(require("../../models/addCourse"));
/* add category */
const addLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { video, coursename, title, duration, description } = req.body;
        const updatedCourse = yield addCourse_1.default.findOneAndUpdate({ _id: coursename }, {
            $push: {
                courseLessons: {
                    video,
                    title: title,
                    duration: duration,
                    description: description,
                },
            },
        }, { new: true });
        if (updatedCourse) {
            res.status(201).json(updatedCourse);
        }
        else {
            res.status(404).json({ error: "Course not found" });
        }
    }
    catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
}));
exports.addLesson = addLesson;
/* add category */
/* get all courses*/
const getLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courses = yield addCourse_1.default.findById(id);
        const allLessons = courses === null || courses === void 0 ? void 0 : courses.courseLessons;
        if (allLessons) {
            res.status(200).json({
                allLessons,
            });
        }
    }
    catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
}));
exports.getLesson = getLesson;
/* get all courses*/
const getTutor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutor = yield instructor_1.default.find().exec();
        if (tutor) {
            res.status(200).json({
                tutor,
            });
        }
    }
    catch (error) {
        res.status(500); // Internal server error
        throw error;
    }
}));
exports.getTutor = getTutor;
