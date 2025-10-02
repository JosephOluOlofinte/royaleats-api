import { auth } from "express-oauth2-jwt-bearer";

// Middleware to check the JWT token in the Authorization header
// and validate it using Auth0 settings from environment variables

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_AL,
});

export default jwtCheck