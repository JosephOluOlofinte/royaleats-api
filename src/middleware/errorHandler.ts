import { ErrorRequestHandler } from "express";
import { Error } from "mongoose";
import { INTERNAL_SERVER_ERROR } from "../constants/http";


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.log(`$PATH: ${req.path}`, error);

    return res.status(INTERNAL_SERVER_ERROR).json({
        status: '500 - INTERNAL SERVER ERROR',
        message: 'Something went wrong. Please try again later.'
    });
}

export default errorHandler;