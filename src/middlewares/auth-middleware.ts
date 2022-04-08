import { Request, Response, NextFunction } from "express";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query.id) {
    next();
  } else {
    res.sendStatus(404);
  }
};
