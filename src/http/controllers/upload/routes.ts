import { Router } from 'express';

import { GetSignedUrlController } from './signed-url';
import { UploadController } from './upload';

import { upload } from '@/config/upload';

const uploadRoutes = Router();

const uploadController = new UploadController();
const getSignedUrlController = new GetSignedUrlController();

uploadRoutes.post('/', upload.single('file'), uploadController.handle);
uploadRoutes.post('/get-signed-url', getSignedUrlController.handle);

export { uploadRoutes };
