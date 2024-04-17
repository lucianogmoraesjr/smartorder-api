import { Request, Response } from 'express';
import z from 'zod';

import { makeUpdateUserUseCase } from '@/use-cases/users/factories/make-update-user-use-case';

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const updateUserParamsSchema = z.object({
      userId: z.string().cuid().or(z.string().uuid()),
    });

    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
      role: z.enum(['WAITER', 'ADMIN']).optional(),
    });

    const { userId } = updateUserParamsSchema.parse(request.params);

    const { name, email, password, role } = createUserBodySchema.parse(
      request.body,
    );

    const updateUserUseCase = makeUpdateUserUseCase();

    const user = await updateUserUseCase.execute({
      id: userId,
      name,
      email,
      password,
      role,
    });

    return response.status(200).json(user);
  }
}
