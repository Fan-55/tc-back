// region Platform Libraries
import express from 'express';
// endregion

import { browseProductsController } from '../../controllers';

const productsRouter = express.Router();

productsRouter.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get((req, res) => browseProductsController.execute(req, res));

export { productsRouter };
