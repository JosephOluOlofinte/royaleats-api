import { Request, Response } from 'express';
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  OK,
} from '../constants/http';
import User from '../models/user.model';
import catchErrors from '../utils/catchErrors';
import registerSchema from '../schemas/registerSchema';
import validateRequest from '../utils/validateRequest';

export const createNewUser = catchErrors(async (req, res) => {
  console.log("Create new User called");
  // validate request
  const request = validateRequest(registerSchema, req);

  // destructure data from request
  const { name, email, password } = request;

  // verify that email doesn't already taken
  const emailTaken = await User.exists({ email });

  if (emailTaken) {
    return res.status(CONFLICT).json({
      status: '409 - CONFLICT',
      message: 'User already exists',
    });
  }

  // create the user. password hashes in pre-save hook
  const newUser = await User.create({
    name,
    email,
    password,
    authType: 'local',
    verified: false,
  });

  // exclude password from response
  const { password: _, ...user } = newUser.toObject();

  // return response
  return res.status(CREATED).json({
    status: '201 - CREATED',
    message: 'User created successfully',
    user,
  });
});

export const createNewAuth0User = catchErrors(async (req, res) => {
  // get auth0Id from req if exists
  const auth0Id = req.auth?.payload.sub;

  if (auth0Id) {
    // get name and email from req body sent by auth0
    const { email } = req.body;

    // check for existing user with auth0Id
    let existingUser = await User.findOne({ auth0Id });

    if (!existingUser) {
      // create new user with auth0Id
      const newUser = await User.create({
        auth0Id,
        email: email,
        verified: true,
        authType: 'auth0',
      });

      return res.status(CREATED).json({
        status: '201- CREATED',
        message: 'Auth0 user created successfully',
        newUser,
      });
      
    }

    return res.status(OK).json({ message: 'User logged in' });
  }
});

export const loginUser = async (req: Request, res: Response) => {
  try {
    return res.status(OK).json({
      status: '200 - OK',
      message: 'Login successful',
    });
  } catch (error) {}
};
