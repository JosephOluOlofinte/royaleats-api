import mongoose from "mongoose";
import iVerificationCode from "../types_and_interfaces/verificationCode.interface";


export const verificationCodeSchema = new mongoose.Schema<iVerificationCode>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // expires after 1 hour
})

const VerificationCode = mongoose.model<iVerificationCode>('VerificationCode', verificationCodeSchema, 'verification_codes');
export default VerificationCode;