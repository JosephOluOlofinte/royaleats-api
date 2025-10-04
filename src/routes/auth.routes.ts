import express from 'express'
import { loginUser, registerUser } from '../controllers/auth.controller';
import { jwtCheck } from '../middleware/auth';



const authRoutes = express.Router();

// prefix: /auth
authRoutes.post('/sign-up', registerUser);
authRoutes.post('/sign-up/auth0', jwtCheck, registerUser)
authRoutes.post('/sign-in', loginUser);


export default authRoutes;
