import express from 'express';
import {
    getOrders,
    getOrderById,
    postOrder,
    putOrderById,
    deleteOrder,
    validateType } from '../controllers/orders.controller.js';

const ordersRouter = express.Router();

ordersRouter.get('/', validateType, getOrders);
ordersRouter.post('/', validateType, postOrder);
ordersRouter.get('/:id', getOrderById);
ordersRouter.put('/:id', validateType, putOrderById);
ordersRouter.delete('/:id', deleteOrder);

export default ordersRouter;