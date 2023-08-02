import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message: string | {} | [] = err.message;

  if (err.name === "CastError") {
    message = "Resource not found";
    statusCode = 404;
  }

  if (err.name === "ZodError") {
    const zodErr = <ZodError>err;
    message = zodErr.issues;
    statusCode = 400;
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

export { notFound, errorHandler };
