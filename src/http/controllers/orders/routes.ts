import { Router } from 'express';

import { CancelOrderController } from './cancel-order-controller';
import { CreateOrderController } from './create-order-controller';
import { GetOrderByIdController } from './get-order-by-id-controller';
import { ListOrdersController } from './list-orders-controller';
import { UpdateOrderStatusController } from './update-order-status-controller';

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const listOrdersController = new ListOrdersController();
const getOrderByIdController = new GetOrderByIdController();
const updateOrderStatusController = new UpdateOrderStatusController();
const cancelOrderController = new CancelOrderController();

ordersRoutes.post('/', createOrderController.handle);
ordersRoutes.get('/', listOrdersController.handle);
ordersRoutes.get('/:orderId', getOrderByIdController.handle);
ordersRoutes.patch('/:orderId', updateOrderStatusController.handle);
ordersRoutes.delete('/:orderId', cancelOrderController.handle);

export { ordersRoutes };
