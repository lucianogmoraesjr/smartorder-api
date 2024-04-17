import { Request, Response } from 'express';

import { makeListUsersUseCase } from '@/use-cases/users/factories/make-list-users-use-case';

export class ListUsersController {
  async handle(request: Request, response: Response) {
    const listUsersUseCase = makeListUsersUseCase();

    const users = await listUsersUseCase.execute();

    return response.json(users);
  }
}
