import { BrowseProductsUseCase } from './BrowseProducts/BrowseProductsUseCase';
import { CheckoutUseCase } from './Checkout/CheckoutUseCase';

import {
  productRepo,
} from '../infra/repos';

const browseProductsUseCase = new BrowseProductsUseCase(productRepo);
const checkoutUseCase = new CheckoutUseCase(productRepo);

export {
  browseProductsUseCase,
  checkoutUseCase,
