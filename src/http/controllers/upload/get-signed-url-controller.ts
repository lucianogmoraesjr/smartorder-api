import { Request, Response } from 'express';

import { makeGetSignedUrlUseCase } from '@/use-cases/upload/factories/make-get-signed-url-use-case';

export class GetSignedUrlController {
  async handle(request: Request, response: Response) {
    const { key } = request.body;

    const getSignedUrlUseCase = makeGetSignedUrlUseCase();

    const signedUrl = await getSignedUrlUseCase.execute(key);

    return response.json(signedUrl);
  }
}
