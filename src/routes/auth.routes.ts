import express from 'express'
import { createNewAuth0User, createNewUser, loginUser,  } from '../controllers/auth.controller';
import { jwtCheck } from '../middleware/auth';



const authRoutes = express.Router();

// prefix: /auth
authRoutes.post('/sign-up', createNewUser);
authRoutes.post('/auth0', jwtCheck, createNewAuth0User);
authRoutes.post('/sign-in', loginUser);


export default authRoutes;
