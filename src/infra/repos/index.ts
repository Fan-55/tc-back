import { BuyerRepo } from './BuyerRepo';
import { ProductRepo } from './ProductRepo';
import { SellerRepo } from './SellerRepo';

const buyerRepo = new BuyerRepo();
const productRepo = new ProductRepo();
const sellerRepo = new SellerRepo();

export {
  buyerRepo,
  productRepo,
  sellerRepo,
};
