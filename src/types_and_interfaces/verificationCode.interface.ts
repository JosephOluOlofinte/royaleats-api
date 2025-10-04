import mongoose from 'mongoose';
import VerificationCodeType from './verificationCode.type';

interface iVerificationCode extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  expiresAt: Date;
  createdAt: Date;
}

export default iVerificationCode;
