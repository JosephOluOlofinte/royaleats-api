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
  jwksUri: process.env.AUTH0_JWKS_URI,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
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



export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    
  } catch (error) {
    // ignore error and try JWT check
  }

  const jwtCheck = auth({
    jwksUri: process.env.AUTH0_JWKS_URI,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    audience: process.env.AUTH0_AUDIENCE,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_AL,
  });
}
// import jwksClient from 'jwks-rsa';

// export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Missing or invalid token' });
//   }

//   const token = authorization.split(' ')[1];

//   let decoded;
//   try {
//     // Step 1: Try verifying with your own secret (email+pw users)
//     decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // If this works, you know it's one of your tokens
//     const user = await User.findById(decoded.userId);
//     if (!user) return res.sendStatus(401);

//     req.userId = user._id.toString();
//     req.authSource = 'local';
//     return next();
//   } catch (err) {
//     // Step 2: If not your token, try Auth0 verification
//     try {
//       // Auth0 publishes a JWKS endpoint with their public keys
//       const client = jwksClient({
//         jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
//       });

//       function getKey(header, callback) {
//         client.getSigningKey(header.kid, (err, key) => {
//           if (err) return callback(err);
//           const signingKey = key.getPublicKey();
//           callback(null, signingKey);
//         });
//       }

//       decoded = jwt.verify(token, getKey, {
//         audience: process.env.AUTH0_AUDIENCE,
//         issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//         algorithms: ['RS256'],
//       });

//       const auth0Id = decoded.sub;
//       const user = await User.findOne({ auth0Id });
//       if (!user) return res.sendStatus(401);

//       req.userId = user._id.toString();
//       req.auth0Id = auth0Id;
//       req.authSource = 'auth0';
//       return next();
//     } catch (auth0Err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   }
// };
