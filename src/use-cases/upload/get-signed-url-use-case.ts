import { IUploader } from '@/storage/uploader';

export class GetSignedUrlUseCase {
  constructor(private uploader: IUploader) {}

  async execute(key: string) {
    const signedUrl = await this.uploader.getPresignedUrl(key);

    return signedUrl;
  }
}
