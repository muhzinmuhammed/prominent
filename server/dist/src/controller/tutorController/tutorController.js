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
exports.loginInstructor = exports.instructorSignup = void 0;
const instructor_1 = __importDefault(require("../../models/instructor"));
const genarateToken_1 = __importDefault(require("../../../utlitis/genarateToken"));
/*instructor register*/
const instructorSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { instrctorname, instrctoremail, password, phone } = req.body;
        const userExists = yield instructor_1.default.findOne({ instrctoremail });
        const userPhone = yield instructor_1.default.findOne({ phone });
        if (userExists || userPhone) {
            return res.status(400).json({ message: "User already exists" });
        }
        const instructor = yield instructor_1.default.create({
            instrctorname,
            instrctoremail,
            phone,
            password,
        });
        if (instructor) {
            const token = (0, genarateToken_1.default)(instructor._id); // Assuming generateToken function returns a string
            res.status(200).json({
                _id: instructor._id,
                name: instructor.instrctorname,
                email: instructor.instrctoremail,
                phone: instructor.phone,
                token,
            });
        }
        else {
            return res.status(400).json({ message: "Invalid instructor data" });
        }
    }
    catch (error) {
        return res.status(500); // Internal server error
        throw error;
    }
});
exports.instructorSignup = instructorSignup;
/*instructor register*/
const loginInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { instrctoremail, password } = req.body;
    try {
        const user = yield instructor_1.default.findOne({ instrctoremail }); // Use StudentModel instead of userModel
        if (!user) {
            return res.status(401).json({ message: "User not logged in" }); // Use return here to exit the function after sending the response
        }
        if (user && (yield user.matchPassword(password))) {
            const token = (0, genarateToken_1.default)(user._id);
            return res.json({
                _id: user._id,
                name: user.instrctorname,
                phone: user.phone,
                email: user.instrctoremail,
                token,
            });
        }
        else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.loginInstructor = loginInstructor;
