import mongoose from 'mongoose';
import iUserDocument from '../types_and_interfaces/userDocument.interface';
import { compareValues, hashValue } from '../utils/bcrypt';

const userSchema = new mongoose.Schema<iUserDocument>(
  {
    auth0Id: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    authType: {
      type: String,
      enum: ['local', 'auth0'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await hashValue(this.password!);
  next();
})

userSchema.methods.comparePassword = async function (value: string) {
  return compareValues(value, this.password!);
}

const User = mongoose.model<iUserDocument>('User', userSchema);
export default User;
