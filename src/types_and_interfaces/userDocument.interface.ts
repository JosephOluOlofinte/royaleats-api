import mongoose from "mongoose";


interface iUserDocument extends mongoose.Document {
    _id: string;
  auth0Id?: string;
  name?: string;
  email: string;
  password?: string;
  verified: boolean;
  address?: string;
  city?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(val: string): Promise<boolean>;
}

export default iUserDocument;