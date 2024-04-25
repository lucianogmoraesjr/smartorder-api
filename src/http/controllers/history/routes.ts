import { Router } from 'express';

import { ArchiveOrderController } from './archive-order-controller';
import { ArchiveRecentOrdersController } from './archive-recent-orders-controller';
import { ListArchivedOrdersController } from './list-archived-orders-controller';

const historyRoutes = Router();

const archiveOrderController = new ArchiveOrderController();
const archiveRecentOrdersController = new ArchiveRecentOrdersController();
const listArchivedOrdersController = new ListArchivedOrdersController();

historyRoutes.get('/', listArchivedOrdersController.handle);
historyRoutes.patch('/archive', archiveOrderController.handle);
historyRoutes.patch('/archive-recent', archiveRecentOrdersController.handle);

export { historyRoutes };
