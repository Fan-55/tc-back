import { BrowseProductsController } from './BrowseProductsController/BrowseProductsController';
import { CheckoutController } from './CheckoutController/CheckoutController';
import { LoginController } from './LoginController/LoginController';

import {
  browseProductsUseCase,
  checkoutUseCase,
  loginUseCase,
} from '../../app/index';

const checkoutController = new CheckoutController(checkoutUseCase);
const browseProductsController = new BrowseProductsController(browseProductsUseCase);
const loginController = new LoginController(loginUseCase);

export {
  browseProductsController,
  checkoutController,
  loginController,
};
