import { ErrorRequestHandler, Response } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http';
import { z } from 'zod';
import handleZodError from '../utils/handleZodErrors';



const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`$PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) {
    handleZodError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    status: '500 - INTERNAL SERVER ERROR',
    message: 'Something went wrong. Please try again later.',
  });
};

export default errorHandler;
