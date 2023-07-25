// region Platform Libraries
import express from 'express';
// endregion

import { checkoutController } from '../../controllers';

const checkoutRouter = express.Router();

checkoutRouter.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post((req, res) => checkoutController.execute(req, res));

export { checkoutRouter };
