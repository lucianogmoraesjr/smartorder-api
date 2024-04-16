import { Request, Response } from 'express';
import z from 'zod';

import { makeAuthenticateUseCase } from '@/use-cases/users/factories/make-authenticate-use-case';

export class AuthenticateController {
  async handle(request: Request, response: Response) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUseCase = makeAuthenticateUseCase();

    const { accessToken } = await authenticateUseCase.execute({
      email,
      password,
    });

    return response.status(200).json({ accessToken });
  }
}
