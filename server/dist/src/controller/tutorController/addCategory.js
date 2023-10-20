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
exports.getAllCategory = exports.addCategory = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
/* add category */
const addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoryExits = yield categoryModel_1.default.find({ title });
        if (categoryExits) {
            res.status(400).json({
                message: "Category alredy exits",
            });
        }
        const category = yield categoryModel_1.default.create({
            title,
            description,
        });
        if (category) {
            res.status(200).json({
                title,
                description,
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
exports.addCategory = addCategory;
/* add category */
/* category*/
const getAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseDetails = yield categoryModel_1.default.find().exec();
        if (courseDetails) {
            res.status(200).json({
                courseDetails,
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
