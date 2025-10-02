import { NextFunction, Request, Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import { UNAUTHORIZED } from '../constants/http';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      auth0Id: string;
      userId: string;
    }
  }
}
// Middleware to check the JWT token in the Authorization header
// and validate it using Auth0 settings from environment variables

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_AL,
});

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the access token from auth header
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(UNAUTHORIZED).json({
      status: '402 - UNAUTHORIZED',
      message: 'You are not authorized to access this resource',
    })
  }

  // get token from auth string
  const token = authorization.split(' ')[1];
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    if (!decodedToken || !decodedToken.sub) {
      return res.status(UNAUTHORIZED).json({
        status: '401 - UNAUTHORIZED',
        message: 'You are not authorized to access this resource',
      })
    }
      // get auth0Id from token
    const auth0Id = decodedToken.sub;

    const user = await User.findOne({ auth0Id });
    if (!user) {
      return res.sendStatus(UNAUTHORIZED)
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();

    next();

  } catch (error) {
    return res.sendStatus(UNAUTHORIZED)
  }
};
