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
exports.totalCount = void 0;
const addCourse_1 = __importDefault(require("../../models/addCourse"));
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const totalCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const totalCountCourse = yield addCourse_1.default.find({
            instructor: id,
        }).countDocuments();
        const EntrolledCourses = yield orderModel_1.default.find({
            instructorId: id,
        }).countDocuments();
        const students = yield orderModel_1.default.find({ instructorId: id }).populate("studentId");
        const studentNames = students.map((order) => order.studentId); // Assuming 'name' is the property you want to extract
        const studentCount = new Set(studentNames).size;
        res.json({ totalCountCourse, EntrolledCourses, studentCount });
    }
    catch (error) {
        console.log(error);
    }
});
exports.totalCount = totalCount;
