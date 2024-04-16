import { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import { AppError } from '@/errors/app-error';

interface IPayload extends JwtPayload {
  sub: string;
  role: 'WAITER' | 'ADMIN';
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer') {
    throw new AppError('Invalid token', 401);
  }

  try {
    const payload = verify(token, 'my-super-secret-password') as IPayload;

    request.user = {
      id: payload.sub,
      role: payload.role,
    };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
