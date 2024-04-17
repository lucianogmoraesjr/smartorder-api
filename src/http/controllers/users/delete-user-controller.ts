import { Request, Response } from 'express';
import z from 'zod';

import { makeDeleteUserUseCase } from '@/use-cases/users/factories/make-delete-user-use-case';

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const deleteUserParamsSchema = z.object({
      userId: z.string().cuid().or(z.string().uuid()),
    });

    const { userId } = deleteUserParamsSchema.parse(request.params);

    const deleteUserUseCase = makeDeleteUserUseCase();

    await deleteUserUseCase.execute(userId);

    return response.sendStatus(204);
  }
}
