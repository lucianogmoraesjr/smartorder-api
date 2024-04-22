import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { IUploader } from './uploader';

import { env } from '@/env';

export class R2Storage implements IUploader {
  private client: S3Client;

  constructor() {
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async getPresignedUrl(key: string) {
    const signedUrl = await getSignedUrl(
      this.client,
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
      }),
      {
        expiresIn: 60,
      },
    );

    return { signedUrl };
  }
}
