import { randomUUID } from 'node:crypto';

import { IUploadParams, IUploader } from '@/storage/uploader';

interface IUpload {
  fileName: string;
  url: string;
}

export class FakeUploader implements IUploader {
  public uploads: IUpload[] = [];

  async upload({ fileName }: IUploadParams): Promise<{ url: string }> {
    const url = randomUUID();

    this.uploads.push({
      fileName,
      url,
    });

    return { url };
  }

  async getPresignedUrl(key: string): Promise<{ signedUrl: string }> {
    const signedUrl = `signed-url-${key}`;

    return { signedUrl };
  }
}
