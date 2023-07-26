import { BrowseProductsController } from './BrowseProductsController/BrowseProductsController';
import { CheckoutController } from './CheckoutController/CheckoutController';
import { LoginController } from './LoginController/LoginController';
import { ReadProductController } from './ReadProductController/ReadProductController';
import { EditProductController } from './EditProductController/EditProductController';
import { AddProductController } from './AddProductController/AddProductController';

import {
  browseProductsUseCase,
  checkoutUseCase,
  loginUseCase,
  readProductUseCase,
  editProductUseCase,
  addProductUseCase,
} from '../../app/index';

const checkoutController = new CheckoutController(checkoutUseCase);
const browseProductsController = new BrowseProductsController(browseProductsUseCase);
const loginController = new LoginController(loginUseCase);
const readProductController = new ReadProductController(readProductUseCase);
const editProductController = new EditProductController(editProductUseCase);
const addProductController = new AddProductController(addProductUseCase);

export {
  browseProductsController,
  checkoutController,
  loginController,
  readProductController,
  editProductController,
  addProductController,
};
