import mongoose from "mongoose";


interface iSessionDocument extends mongoose.Document{
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

export default iSessionDocument;