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

export const createNewUser = catchErrors(async (req, res) => {
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

  // create the user
  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
    authType: 'local',
    verified: false,
  });

  // return response
  return res.status(CREATED).json({
    status: '201- CREATED',
    message: 'User created successfully',
    newUser,
  });

});

export const createNewAuth0User = catchErrors(async (req, res) => {

    // get auth0Id from req if exists
    const auth0Id = req.auth?.payload.sub;
    const email = req.auth?.payload.email;
    const name = req.auth?.payload.name;

    if (auth0Id) {
      // check for existing user with auth0Id
      let existingUser = await User.findOne({ auth0Id });

      if (!existingUser) {

        // create new user with auth0Id
        const newUser = await User.create({
          auth0Id,
          name,
          email: email,
          verified: true,
          authType: 'auth0'
        });

        return res.status(CREATED).json({
          status: '201- CREATED',
          message: 'Auth0 user created successfully',
          newUser
        })
      }

      return res.status(OK).json({ message: 'User logged in' });
  }
  
})

export const loginUser = async (req: Request, res: Response) => {
  try {
    return res.status(OK).json({
      status: '200 - OK',
      message: 'Login successful',
    });
  } catch (error) {}
};
