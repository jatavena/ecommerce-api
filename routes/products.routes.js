import express from 'express';
import { 
    getProducts, 
    postProducts, 
    getProductById, 
    putProductById,
    deleteProduct,
    validateType } from '../controllers/products.controller.js';

const productsRouter = express.Router();

productsRouter.get('/', validateType, getProducts);
productsRouter.post('/', validateType, postProducts);
productsRouter.get('/:id', getProductById);
productsRouter.put('/:id', validateType, putProductById);
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;