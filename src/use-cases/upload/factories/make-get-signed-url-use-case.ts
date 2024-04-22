import { GetSignedUrlUseCase } from '../get-signed-url-use-case';

import { R2Storage } from '@/storage/r2-storage';

export function makeGetSignedUrlUseCase() {
  const r2Storage = new R2Storage();
  const getSignedUrlUseCase = new GetSignedUrlUseCase(r2Storage);

  return getSignedUrlUseCase;
}
