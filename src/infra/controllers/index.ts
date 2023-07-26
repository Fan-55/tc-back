import { BrowseProductsController } from './BrowseProductsController/BrowseProductsController';
import { CheckoutController } from './CheckoutController/CheckoutController';
import { LoginController } from './LoginController/LoginController';
import { ReadProductController } from './ReadProductController/ReadProductController';
import { AddProductController } from './AddProductController/AddProductController';

import {
  browseProductsUseCase,
  checkoutUseCase,
  loginUseCase,
  readProductUseCase,
  addProductUseCase,
} from '../../app/index';

const checkoutController = new CheckoutController(checkoutUseCase);
const browseProductsController = new BrowseProductsController(browseProductsUseCase);
const loginController = new LoginController(loginUseCase);
const readProductController = new ReadProductController(readProductUseCase);
const addProductController = new AddProductController(addProductUseCase);

export {
  browseProductsController,
  checkoutController,
  loginController,
  readProductController,
  addProductController,
};
