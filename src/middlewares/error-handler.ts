import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { AppError } from '@/errors/app-error';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: 'Validation error', issues: error.format() });
  }

  console.error(error);

  return response.sendStatus(500);
}
