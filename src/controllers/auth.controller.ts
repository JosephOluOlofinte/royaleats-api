import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from '../constants/http';
import User from '../models/user.model';
import catchErrors from '../utils/catchErrors';
import registerSchema from '../schemas/registerSchema';
import validateRequest from '../utils/validateRequest';

export const registerUser = catchErrors(
  async (req, res) => {
    // validate request
    const request = registerSchema.parse({
      ...req.body,
      userAgent: req.headers['user-agent'],
    });


  // destructure data from request
    const { name, email, password } = request;
    
    // verify that email doesn't exist
      const existingUser = await User.exists({ email });

      if (existingUser) {
        throw new Error('User already exists');
    }
    
    // hash password

      // create the user
      const newUser = new User({
        name: name,
        email: email,
        password: password,
      });
      newUser.save();


    // return response
    return res.status(CREATED).json({
      status: '201- CREATED',
      message: 'User created successfully',
      newUser
    })

  // auth0 logic, coming to it in a bit
  // try {
  //   const { auth0Id, email, name } = req.body;

  //   //   check if incoming request contains auth0Id
  //   if (!auth0Id) {
  //     return res.status(BAD_REQUEST).json({ message: 'auth0Id is required' });
  //   }
  //   let user = await User.findOne({ auth0Id });
  //   if (user) {
  //     return res.status(OK).json(user.toObject());
  //   }

  //   //   create new user
  //   user = new User({ auth0Id, email });
  //   await user.save();

  //   //   return the response
  //   return res.status(CREATED).json(user.toObject());
  // } catch (error) {
  //   console.error('Error creating user:', error);
  //   return res.status(INTERNAL_SERVER_ERROR).json({
  //     message: 'Error creating the user',
  //   });
  // }
});

export const loginUser = async (req: Request, res: Response) => {
  try {
    return res.status(OK).json({
      status: '200 - OK',
      message: 'Login successful',
    });
  } catch (error) {}
};
