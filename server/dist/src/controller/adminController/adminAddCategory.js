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
exports.addCategory = void 0;
const categoryModel_1 = __importDefault(require("../../models/categoryModel"));
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const categoryExists = yield categoryModel_1.default.findOne({
            title: { $regex: new RegExp(title, "i") },
        });
        if (categoryExists) {
            console.log("kk");
            return res.status(400).json({ message: "Category already exists" });
        }
        const category = yield categoryModel_1.default.create({
            title,
            description,
        });
        if (category) {
            console.log(title, "created");
            res.status(201).json({
                title,
                description,
            });
        }
        else {
            res.status(400).json({ message: "Invalid category data" });
        }
    }
    catch (error) {
        next(error); // Pass the error to the Express error handling middleware
    }
});
exports.addCategory = addCategory;
