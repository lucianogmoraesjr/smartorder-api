import { Request, Response } from 'express';
import z from 'zod';

import { makeGetUserByIdUseCase } from '@/use-cases/users/factories/make-get-user-by-id-use-case';

export class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const getUserByIdParamsSchema = z.object({
      userId: z.string().cuid().or(z.string().uuid()),
    });

    const { userId } = getUserByIdParamsSchema.parse(request.params);

    const getUserByIdUseCase = makeGetUserByIdUseCase();

    const user = await getUserByIdUseCase.execute(userId);

    return response.status(200).json(user);
  }
}
