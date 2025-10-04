import { Request, Response } from "express";
import User from "../models/user.model";
import { NOT_FOUND } from "../constants/http";


const isLoggedIn = async (req: Request, res: Response) => {
    // get current user ID from req
    const currentuserId = req.userId;
    const currentUser = await User.findById(currentuserId);

    if (!currentUser) {
        return res.status(NOT_FOUND).json({
            status: '404 - NOT FOUND',
            message: 'You must be logged in to access this resource'
        })
    }
}