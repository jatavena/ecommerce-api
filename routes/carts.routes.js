import express from 'express';
import { postCarts, getCartById, putCartById, deleteCart, getCartProducts, validateType } from '../controllers/carts.controller.js';

const cartsRouter = express.Router();

cartsRouter.post('/', validateType, postCarts);
cartsRouter.get('/:id', getCartById);
cartsRouter.put('/:id', validateType, putCartById);
cartsRouter.delete('/:id', deleteCart);

cartsRouter.get('/:id/products', getCartProducts);

export default cartsRouter;