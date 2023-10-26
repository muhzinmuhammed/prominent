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
exports.verifyOrder = exports.orderDetails = void 0;
const orderModel_1 = __importDefault(require("../../models/orderModel"));
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
const addCourse_1 = __importDefault(require("../../models/addCourse"));
const instructor_1 = __importDefault(require("../../models/instructor"));
dotenv_1.default.config();
const orderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { coursename, studentname } = req.body;
        const course = yield orderModel_1.default.findOne({ courseId: coursename, studentId: studentname });
        if (course) {
            return res.status(400).json({ message: 'course alredy buying' });
        }
        const instance = new razorpay_1.default({
            key_id: process.env.KEY_ID || "",
            key_secret: process.env.KEY_SECRET || "",
        });
        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto_1.default.randomBytes(10).toString("hex"),
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ data: order });
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "Bad request" }); // Proper response for a bad request
    }
});
exports.orderDetails = orderDetails;
const verifyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { response, amount, coursename, studentname } = req.body;
        const course_id = yield addCourse_1.default.findById({ _id: coursename });
        const tutor_id = course_id === null || course_id === void 0 ? void 0 : course_id.instructor;
        const sign = response.razorpay_order_id + "|" + response.razorpay_payment_id;
        const expectedSign = crypto_1.default
            .createHmac("sha256", process.env.KEY_SECRET || "")
            .update(sign)
            .digest("hex");
        if (response.razorpay_signature === expectedSign) {
            const real = amount / 100;
            const adminAmount = (real * 90) / 100;
            const tutorAmount = (real * 10) / 100;
            const tutor = yield instructor_1.default.findById(tutor_id);
            if (tutor) {
                yield instructor_1.default.findOneAndUpdate({ _id: tutor_id }, {
                    $inc: {
                        income: tutorAmount
                    }
                });
            }
            // Assuming you have a mongoose OrderModel defined
            yield orderModel_1.default.create({
                amount: adminAmount,
                studentId: studentname,
                courseId: coursename,
                instructorId: tutor_id,
            });
            return res.status(200).json({ message: "Payment verified successfully" });
        }
        else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.verifyOrder = verifyOrder;
