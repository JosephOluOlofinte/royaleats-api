import { Request } from "express";
import { ZodObject } from "zod";


const validateRequest = (schema: ZodObject, req: Request): Object => {
    const request = schema.parse({
      ...req.body,
      userAgent: req.headers["user-agent"],
    })
    return request;
}

export default validateRequest;