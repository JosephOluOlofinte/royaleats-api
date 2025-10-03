import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from "../constants/http";
import User from "../models/user.model";



export const registerUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id, email, name } = req.body;
    

    //   check if user exists
    if (!auth0Id) {
      return res.status(BAD_REQUEST).json({ message: 'auth0Id is required' });
    }
    let user = await User.findOne({ auth0Id });
    if (user) {
      return res.status(OK).json(user.toObject());
    }

    //   create new user
    user = new User({ auth0Id, email, name });
    await user.save();

    //   return the response
    return res.status(CREATED).json(user.toObject());
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Error creating the user',
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        

        return res.status(OK).json({
            status: '200 - OK',
            message: 'Login successful'
        })
    } catch (error) {
        
    }
}