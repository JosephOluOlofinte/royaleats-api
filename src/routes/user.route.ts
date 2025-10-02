import express from 'express';
import { createUser, updateCurrentUser } from '../controllers/users.controller';
import { jwtCheck, jwtParse } from '../middleware/auth';
import { validateProfileUpdateRequest } from '../middleware/validation';

const userRoutes = express.Router();

// /api/v1/users
userRoutes.post('/', jwtCheck, createUser);
userRoutes.put('/', jwtCheck, jwtParse, validateProfileUpdateRequest, updateCurrentUser);

export default userRoutes;
