// region Platform Libraries
import express from 'express';
// endregion

import { loginController } from '../../controllers';

const loginRouter = express.Router();

loginRouter.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post((req, res) => loginController.execute(req, res));

export { loginRouter };
