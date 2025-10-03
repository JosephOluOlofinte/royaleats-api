import { Request, Response } from "express";
import User from "../models/user.model";
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http";




export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, address, country, city } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(NOT_FOUND).json({
        status: '404 - NOT FOUND',
        message: 'user not found'
      })
    }

    // update user
    user.name = name;
    user.address = address;
    user.country = country;
    user.city = city;

    await user.save();

    return res.status(OK).json({
      status: '200 - OK',
      message: 'user updated successfully',
      user: user.toObject()
    })

  } catch (error) {
    console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({
      message: 'Error updating user.'
    })
  }
}
