import express from 'express';

import {
  allOrders,
  createOrder,
  deleteOrder,
  findOrderById,
  updateOrder,
  updateDeliveryStatus,
  findOrdersByUserId
} from '../controller/orders';

const router = express.Router();

router.get('/', allOrders);
router.get('/userorders/:userId', findOrdersByUserId)
router.get('/:orderId', findOrderById);
router.delete('/:orderId', deleteOrder);
router.post('/', createOrder);
router.post('/:orderId', updateOrder);
router.post('/deliverystatus/:orderId', updateDeliveryStatus);



export default router;
