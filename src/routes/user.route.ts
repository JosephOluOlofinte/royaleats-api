import express from 'express'
import { createUser } from '../controllers/users.controller';
import jwtCheck from '../middleware/auth';

const userRoutes = express.Router();

// /api/v1/users
userRoutes.post('/', jwtCheck, createUser);


export default userRoutes;