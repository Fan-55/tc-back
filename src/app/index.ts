import { BrowseProductsUseCase } from './BrowseProducts/BrowseProductsUseCase';

import {
  productRepo,
} from '../infra/repos';

const browseProductsUseCase = new BrowseProductsUseCase(productRepo);

export {
  browseProductsUseCase,
