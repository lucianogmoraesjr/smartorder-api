import { Router } from 'express';

import { GetSignedUrlController } from './get-signed-url-controller';

const uploadRoutes = Router();

const getSignedUrlController = new GetSignedUrlController();

uploadRoutes.post('/get-signed-url', getSignedUrlController.handle);

export { uploadRoutes };
