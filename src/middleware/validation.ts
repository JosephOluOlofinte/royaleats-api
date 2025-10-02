import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BAD_REQUEST } from "../constants/http";

const handleValidationErrors = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json({ errors: errors.array() })
    }
    
    next();
}

export const validateProfileUpdateRequest = [
    // validation logic
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('address').isString().notEmpty().withMessage('Address must be a string'),
    body('city').isString().notEmpty().withMessage('City must be a string'),
    body('country').isString().notEmpty().withMessage('Country must be a string'),
    handleValidationErrors,
];