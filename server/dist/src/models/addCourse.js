"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["Easy"] = "easy";
    CourseLevel["Medium"] = "medium";
    CourseLevel["Hard"] = "hard";
})(CourseLevel || (CourseLevel = {}));
const courseSchema = new mongoose_1.Schema({
    coursename: {
        type: String,
        required: true,
    },
    courseduration: {
        type: Date,
        required: true,
    },
    coursedescription: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "categorycollection",
        required: true,
    },
    coursefee: {
        type: Number,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    courseLevel: {
        type: String,
        enum: Object.values(CourseLevel),
        required: true,
    },
    photo: [
        {
            type: String,
        },
    ],
    instructor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "instructorcollection",
        required: true,
    },
    rating: [
        {
            start: Number,
            postedby: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "studentCollection", // Replace with your actual student collection name
            },
        },
    ],
    courseLessons: [
        {
            title: {
                type: String,
                required: true,
            },
            duration: {
                type: Number,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                type: String,
                required: true,
            },
            isActive: {
                type: Boolean,
                required: true,
                default: true,
            },
        },
    ],
    totalRating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
// Define the model using the model function and export it
const CourseModel = (0, mongoose_1.model)("Course", courseSchema);
exports.default = CourseModel;
