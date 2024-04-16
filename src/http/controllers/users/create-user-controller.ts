import { Request, Response } from 'express';
import z from 'zod';

import { makeCreateUserUseCase } from '@/use-cases/users/factories/make-create-user-use-case';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['WAITER', 'ADMIN']).optional(),
    });

    const { name, email, password, role } = createUserBodySchema.parse(
      request.body,
    );

    const createUserUseCase = makeCreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      role,
    });

    return response.status(201).json(user);
  }
}
