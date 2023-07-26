import { BrowseProductsUseCase } from './BrowseProducts/BrowseProductsUseCase';
import { CheckoutUseCase } from './Checkout/CheckoutUseCase';
import { LoginUseCase } from './Login/LoginUseCase';
import { AddProductUseCase } from './AddProduct/AddProductUseCase';

import {
  buyerRepo,
  productRepo,
  sellerRepo,
} from '../infra/repos';

const browseProductsUseCase = new BrowseProductsUseCase(productRepo);
const checkoutUseCase = new CheckoutUseCase(productRepo);
const loginUseCase = new LoginUseCase(buyerRepo, sellerRepo);
const addProductUseCase = new AddProductUseCase(productRepo);

export {
  browseProductsUseCase,
  checkoutUseCase,
  loginUseCase,
  addProductUseCase,
};
