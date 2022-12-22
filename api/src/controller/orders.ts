import { Request, Response, NextFunction } from 'express';
import orderService from '../services/orders';
import Orders from '../models/Orders';
import { AlreadyExistError, BadRequestError } from '../apiErrors/apiErrors';

//Find all orders info
export const allOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const findAllOrders = await orderService.allOrders();
    res.status(200).json(findAllOrders);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Find order by Id
export const findOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;
    const foundOrderById = await orderService.findOrderById(orderId);
    console.log('foundOrderById   ', foundOrderById);
    res.status(200).json(foundOrderById);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};

//Create order
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      userId,
      cakeId,
      amount,
      totalPrice,
      deliveryDate
    } = req.body;

    // const existingOrder = await Orders.findOne({ cakeId });
    // if (existingOrder) throw new AlreadyExistError();

    const order = new Orders({
      userId,
        cakeId,
        amount,
        totalPrice,
        deliveryDate

    });

    await orderService.createOrder(order);
    res.status(200).json(order);
  } catch (err) {
    console.log("error  ", err)
    next(new BadRequestError('Can not create order', err));
  }
};

//Delete a order
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    await orderService.deleteOrder(orderId);
    res.status(204).end();
  } catch (err) {
    next(new BadRequestError('Can not delete.....', err));
  }
};

//Update order info by Id
export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateOrderInfoFromBody = req.body;
    const orderId = req.params.orderId;

    const updatedOrderInfo = await orderService.updateOrder(
      orderId,
      updateOrderInfoFromBody
    );
    res.json(updatedOrderInfo);
  } catch (err) {
    next(new BadRequestError('Can not delete.....', err));
  }
};

//update delivery status true or false
export const updateDeliveryStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    const updatedOrderInfo = await orderService.updateDeliveryStatus(orderId);
    res.json(updatedOrderInfo);
  } catch (err) {
    next(new BadRequestError('Can not .....', err));
  }
};

//Find order by userId
export const findOrdersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const foundOrderByUserId = await orderService.findOrderByUserId(userId);
    //console.log('foundOrderById   ', foundOrderByUserId);
    res.status(200).json(foundOrderByUserId);
  } catch (err) {
    next(new BadRequestError('Invalid Request', err));
  }
};