import express from "express";
import { getCurrentUser, updateCurrentUser } from "../controllers/currentUser.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateProfileUpdateRequest } from "../middleware/validation";

const currentUserRoutes = express.Router();

// /api/v1/current-user
currentUserRoutes.put('/',jwtCheck, validateProfileUpdateRequest, updateCurrentUser);
currentUserRoutes.get(
  '/',
  jwtCheck,
  validateProfileUpdateRequest,
  getCurrentUser
);


export default currentUserRoutes;