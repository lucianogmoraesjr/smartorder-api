import { Request, Response } from 'express';

import { R2Storage } from '@/storage/r2-storage';

export class UploadController {
  async handle(request: Request, response: Response) {
    try {
      const file = request.file;

      const r2Storage = new R2Storage();

      if (!file) {
        return response.status(400).json({ message: 'File is missing' });
      }
      const result = await r2Storage.upload({
        fileName: file?.originalname,
        fileType: file?.mimetype,
        body: file?.buffer,
      });

      return response.json(result);
    } catch (error) {
      console.log(error);
    }
  }
}
