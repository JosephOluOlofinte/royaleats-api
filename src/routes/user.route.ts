import express from 'express'
import { createUser } from '../controllers/users.controller';

const userRoutes = express.Router();

// /api/v1/users
userRoutes.post('/', createUser);


export default userRoutes;