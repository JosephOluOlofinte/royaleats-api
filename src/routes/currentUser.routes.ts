import express from "express";
import { updateCurrentUser } from "../controllers/currentUser.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateProfileUpdateRequest } from "../middleware/validation";

const currentUserRoutes = express.Router();

// /api/v1/me
currentUserRoutes.put('/',jwtCheck, jwtParse, validateProfileUpdateRequest, updateCurrentUser);


export default currentUserRoutes;