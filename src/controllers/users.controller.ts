import { Request, Response } from "express";
import User from "../models/user.model";


export const getAllUsers = async (req: Request, res: Response) => {
    // check if current user is logged in
    const currentUser = User.findById(req.userId)
    const users = User.find();
}