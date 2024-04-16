import { NextFunction, Request, Response } from 'express';

import { AppError } from '@/errors/app-error';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { role } = request.user;

  if (role !== 'ADMIN') {
    throw new AppError('Unauthorized', 401);
  }

  return next();
}
