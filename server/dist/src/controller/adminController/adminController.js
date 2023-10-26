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
exports.getAllCategory = exports.unBlockStudent = exports.blockStudent = exports.getAllInstructor = exports.getAllStudent = exports.loginAdmin = void 0;
const userModel_1 = __importDefault(require("../../models/userModel"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const instructor_1 = __importDefault(require("../../models/instructor"));
const genarateToken_1 = __importDefault(require("../../../utlitis/genarateToken"));
/*admin login*/
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = "admin@gmail.com";
        const adminpassword = 123456;
        const id = "ObjectId(6502229c761cead53ce1099u)";
        const { adminname, password } = req.body;
        if (adminEmail == adminname && adminpassword == password) {
            const token = (0, genarateToken_1.default)(id);
            return res.status(200).json({
                id,
                adminEmail,
                token,
            });
        }
        else {
            return res.status(400).json({
                message: "please correct code",
            });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.loginAdmin = loginAdmin;
/*admin login*/
/*get all student*/
const getAllStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentDetails = yield userModel_1.default.find().exec();
        if (studentDetails) {
            res.status(200).json({
                studentDetails,
            });
        }
        else {
            return res.status(400).json({
                message: "no users in this table",
            });
        }
    }
    catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
    }
});
exports.getAllStudent = getAllStudent;
/*get all student*/
//* get all instructors* */
const getAllInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructorDetails = yield instructor_1.default.find().exec();
        if (instructorDetails) {
            res.status(200).json({
                instructorDetails,
            });
        }
        else {
            return res.status(400).json({
                message: "no users in this table",
            });
        }
    }
    catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
    }
});
exports.getAllInstructor = getAllInstructor;
//* get all instructors* */
//* get all instructors* */
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryDetails = yield categoryModel_1.default.find().exec();
        if (categoryDetails) {
            res.status(200).json({
                categoryDetails,
            });
        }
        else {
            return res.status(400).json({
                message: "no users in this table",
            });
        }
    }
    catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
    }
});
exports.getAllCategory = getAllCategory;
//* get all instructors* */
/*block student*/
const blockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userToBlock = yield userModel_1.default.findById(id);
        if (!userToBlock) {
            return res.status(404).json({ message: "User not found" });
        }
        userToBlock.isBlocked = true; // Set the 'isBlocked' property to true
        yield userToBlock.save();
        return res.status(200).json({ message: "User blocked successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}); /*block student*/
exports.blockStudent = blockStudent;
/*unblock student*/
const unBlockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const userToBlock = yield userModel_1.default.findById(id);
        if (!userToBlock) {
            return res.status(404).json({ message: "User not found" });
        }
        userToBlock.isBlocked = false; // Set the 'isBlocked' property to true
        yield userToBlock.save();
        return res.status(200).json({ message: "User unblocked successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unBlockStudent = unBlockStudent;
