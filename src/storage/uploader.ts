export interface IUploader {
  getPresignedUrl(key: string): Promise<{ signedUrl: string }>;
}
