// region Platform Libraries
import express from 'express';
// endregion

import {
  browseProductsController,
  readProductController,
  addProductController,
} from '../../controllers';

const productsRouter = express.Router();

productsRouter.route('/:id')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get((req, res) => readProductController.execute(req, res))
productsRouter.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get((req, res) => browseProductsController.execute(req, res))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post((req, res) => addProductController.execute(req, res));

export { productsRouter };
