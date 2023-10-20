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
exports.tutorProtect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const instructor_1 = __importDefault(require("../models/instructor"));
const tutorProtect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers["authorization"];
        if (!authorizationHeader) {
            throw new Error("Authorization header missing");
        }
        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            throw new Error("Token missing in authorization header");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.userId = decodedToken.user_id;
        const tutor = yield instructor_1.default.findById(req.body.userId);
        if (!tutor) {
            throw new Error("User not found");
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(401).redirect("/tutor_login");
        // Optionally, you can log the error for debugging purposes:
    }
});
exports.tutorProtect = tutorProtect;
