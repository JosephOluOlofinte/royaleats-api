import { Request } from "express";
import { ZodType } from "zod";


const validateRequest = <T extends ZodType>(schema: T, req: Request) => {
  return schema.parse({
    ...req.body,
    userAgent: req.headers['user-agent'],
  });
};

export default validateRequest;