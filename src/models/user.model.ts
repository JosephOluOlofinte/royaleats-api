import mongoose from 'mongoose';
import iUserDocument from '../types_and_interfaces/userDocument.interface';
import { compareValues, hashValue } from '../utils/bcrypt';

const userSchema = new mongoose.Schema<iUserDocument>(
  {
    auth0Id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
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
