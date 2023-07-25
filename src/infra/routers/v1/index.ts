// region Platform Libraries
import express from 'express';
// endregion

// region Project Libraries
import { checkoutRouter } from './checkoutRouter';
import { productsRouter } from './productsRouter';
import { loginRouter } from './loginRouter';
// endregion

const v1 = express.Router();

v1.use('/checkout', checkoutRouter);
v1.use('/products', productsRouter);
v1.use('/login', loginRouter);

export { v1 };
