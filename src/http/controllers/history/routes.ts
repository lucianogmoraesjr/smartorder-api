import { Router } from 'express';

import { ArchiveOrderController } from './archive-order-controller';

const historyRoutes = Router();

const archiveOrderController = new ArchiveOrderController();

historyRoutes.patch('/archive', archiveOrderController.handle);

export { historyRoutes };
