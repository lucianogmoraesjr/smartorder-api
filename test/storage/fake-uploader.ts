import { IUploader } from '@/storage/uploader';

export class FakeUploader implements IUploader {
  async getPresignedUrl(key: string): Promise<{ signedUrl: string }> {
    const signedUrl = `signed-url-${key}`;

    return { signedUrl };
  }
}
