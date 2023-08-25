import bcrypt from 'bcrypt';
import mongoose, { Schema, Document, model, Model } from 'mongoose';


interface IStudent extends Document {
    studentname: string;
    studentemail: string;
    phone: number;
    password: string;
    photo: string[];
    courses: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IStudent>({
    studentname: {
        type: String,
        required: true,
    },
    studentemail: {
        type: String,
        required: true,
        unique: true, // Add unique constraint
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: [{
        type: String,
    }],
    courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courseModel',
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre<IStudent>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Define the model using the model function and export it
const StudentModel: Model<IStudent> = model<IStudent>('studentCollection', userSchema);
export default StudentModel;