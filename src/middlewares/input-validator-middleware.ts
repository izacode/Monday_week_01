import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const inputValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // here we make validation. Also here we can transform returned object (for example to satisfy the Swagger API)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errorMessages: errors.array(), resultcode: 0 });
  } else {
    next();
  }
};
