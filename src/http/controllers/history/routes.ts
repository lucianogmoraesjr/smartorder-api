import { Router } from 'express';

import { ArchiveOrderController } from './archive-order-controller';
import { ListArchivedOrdersController } from './list-archived-orders-controller';

const historyRoutes = Router();

const archiveOrderController = new ArchiveOrderController();
const listArchivedOrdersController = new ListArchivedOrdersController();

historyRoutes.get('/', listArchivedOrdersController.handle);
historyRoutes.patch('/archive', archiveOrderController.handle);

export { historyRoutes };
