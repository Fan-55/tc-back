// region Platform Libraries
import express from 'express';
// endregion

// region Project Libraries
import { checkoutRouter } from './checkoutRouter';
import { productsRouter } from './productsRouter';
// endregion

const v1 = express.Router();

v1.use('/checkout', checkoutRouter);
v1.use('/products', productsRouter);

export { v1 };
