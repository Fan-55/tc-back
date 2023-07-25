import { BrowseProductsController } from './BrowseProductsController/BrowseProductsController';
import {
  browseProductsUseCase,
} from '../../app/index';

const browseProductsController = new BrowseProductsController(browseProductsUseCase);

export {
  browseProductsController,
};
