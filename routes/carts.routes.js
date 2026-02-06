import express from 'express';
import { getCarts, postCarts, getCartById, putCartById, deleteCart, validateType } from '../controllers/carts.controller.js';

const cartsRouter = express.Router();

cartsRouter.post('/', validateType, postCarts);
cartsRouter.get('/:id', getCartById);
cartsRouter.put('/:id', validateType, putCartById);
cartsRouter.delete('/:id', deleteCart);

export default cartsRouter;