import z from "zod";
import { BAD_REQUEST } from "../constants/http";
import { Response } from "express";


const handleZodError = (res: Response, error: z.ZodError) => {
  const errors = error.issues.map((err) => ({
      path: err.path.join('.'),
      message: err.message
  }));
  return res.status(BAD_REQUEST).json({
    status: '400 - BAD REQUEST',
    message: 'Error! Bad Request',
    errors,
  });
};

export default handleZodError;