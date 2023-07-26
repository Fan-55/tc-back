import { BrowseProductsController } from './BrowseProductsController/BrowseProductsController';
import { CheckoutController } from './CheckoutController/CheckoutController';
import { LoginController } from './LoginController/LoginController';
import { AddProductController } from './AddProductController/AddProductController';

import {
  browseProductsUseCase,
  checkoutUseCase,
  loginUseCase,
  addProductUseCase,
} from '../../app/index';

const checkoutController = new CheckoutController(checkoutUseCase);
const browseProductsController = new BrowseProductsController(browseProductsUseCase);
const loginController = new LoginController(loginUseCase);
const addProductController = new AddProductController(addProductUseCase);

export {
  browseProductsController,
  checkoutController,
  loginController,
  addProductController,
};
