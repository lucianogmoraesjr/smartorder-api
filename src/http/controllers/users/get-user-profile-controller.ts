import { Request, Response } from 'express';

import { makeGetUserProfileUseCase } from '@/use-cases/users/factories/make-get-user-profile-use-case';

export class GetUserProfileController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const getUserProfileUseCase = makeGetUserProfileUseCase();

    const user = await getUserProfileUseCase.execute(id);

    return response.status(200).json(user);
  }
}
