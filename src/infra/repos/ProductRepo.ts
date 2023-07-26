// region Platform Libraries
import { Op, Sequelize } from 'sequelize';
// endregion

// region Project Libraries
import { Product as ProductModel } from '../../base/infra/mappers/models/Product';
import { Product } from '../../domain/entities/Product';
import { SequelizeConnection } from '../../base/infra/repos/SequelizeConnection';
import { IRepo, Repo } from '../../base/infra/repos/Repo';
import { Result } from '../../base/Result';
import { ProductMapper } from '../mappers/ProductMapper';
// endregion

interface IQueryOptions {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: number;
}

interface IUpdateStockTarget {
  id: number;
  quantity: number;
}

interface IAddProduct {
  available: boolean;
  name: string;
  price: number;
  description?: string;
  stock: number;
  sellerId: number;
}

interface IProductRepo extends IRepo {
  readMany(queryOptions: IQueryOptions): Promise<Result<Product[]>>;
  updateStock(targets: IUpdateStockTarget[]): Promise<Result<boolean>>;
  readById(id: number): Promise<Result<Product>>;
  add(product: IAddProduct): Promise<Result<boolean>>;
}

class SequelizeStrategy implements IProductRepo {
  private sequelize: Sequelize | null = null;

  // region IProductRepo implementation
  async readMany(queryOptions: IQueryOptions): Promise<Result<Product[]>> {
    try {
      const {
        q, minPrice, maxPrice, sellerId,
      } = queryOptions;
      await this.ensureConnection();
      const query = { where: {} as Record<string, unknown> };
      if (q) {
        query.where.name = q;
      }
      if (minPrice) {
        query.where.price = { [Op.gte]: minPrice };
      }
      if (maxPrice) {
        query.where.price = { [Op.lte]: maxPrice };
      }
      if (sellerId) {
        query.where.SellerId = sellerId;
      }
      const browsedProducts = await ProductModel.findAll(query);
      const mapProducts = browsedProducts.map((product) => {
        const mapProductResult = ProductMapper.ToDomain(product);
        if (!mapProductResult.value) {
          throw new Error('encountered unexpected error when ProductMapper.ToDomain while ProductRepo.readMany');
        }
        return mapProductResult.value;
      });
      return Result.Ok(mapProducts);
    } catch (e) {
      return Result.Fail((e as Error).message ? (e as Error).message : 'encountered unexpected error when ProductRepo.readMany', true);
    }
  }

  async updateStock(targets: IUpdateStockTarget[]): Promise<Result<boolean>> {
    try {
      await this.ensureConnection();
      let idList = '';
      let query = 'UPDATE Products SET stock = Case ';
      targets.forEach((target, index) => {
        idList += `${index > 0 ? ',' : ''}${target.id}`;
        query += ` WHEN id = ${target.id} THEN stock - ${target.quantity}`;
      });
      query += ` ELSE stock END WHERE id IN(${idList})`;
      await (this.sequelize as Sequelize).query(query);
      return Result.Ok(true);
    } catch (e) {
      return Result.Fail((e as Error).message ? (e as Error).message : 'encountered unexpected error when ProductRepo.updateStock', true);
    }
  }

  async readById(id: number): Promise<Result<Product>> {
    try {
      await this.ensureConnection();
      const foundProduct = await ProductModel.findByPk(id);
      if (foundProduct) {
        const mapProductResult = ProductMapper.ToDomain(foundProduct);
        if (!mapProductResult.value) {
          return Result.Fail('encountered unexpected error when ProductMapper.ToDomain while ProductRepo.readById', true);
        }
        return Result.Ok(mapProductResult.value);
      }
      return Result.Fail('Product not found');
    } catch (e) {
      return Result.Fail((e as Error).message ? (e as Error).message : 'encountered unexpected error when ProductRepo.readById', true);
    }
  }

  async add(product: IAddProduct): Promise<Result<boolean>> {
    try {
      await this.ensureConnection();
      await ProductModel.create({
        name: product.name,
        available: product.available,
        price: product.price,
        description: product.description,
        stock: product.stock,
        SellerId: product.sellerId,
        image: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20baseProfile%3D%22full%22%20width%3D%22640%22%20height%3D%22480%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22grey%22%2F%3E%3Ctext%20x%3D%22320%22%20y%3D%22240%22%20font-size%3D%2220%22%20alignment-baseline%3D%22middle%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3E640x480%3C%2Ftext%3E%3C%2Fsvg%3E',
      });
      return Result.Ok(true);
    } catch (e) {
      return Result.Fail((e as Error).message ? (e as Error).message : 'encountered unexpected error when ProductRepo.add', true);
    }
  }
  // endregion

  private async ensureConnection(): Promise<void> {
    if (!this.sequelize) {
      this.sequelize = SequelizeConnection.GetInstance();
    }
    try {
      await this.sequelize.authenticate();
    } catch {
      throw new Error('db connection failed');
    }
  }
}

export class ProductRepo extends Repo {
  constructor() {
    super(SequelizeStrategy);
  }

  readMany(queryOptions: IQueryOptions) {
    return (this.strategy as IProductRepo).readMany(queryOptions);
  }

  updateStock(targets: IUpdateStockTarget[]): Promise<Result<boolean>> {
    return (this.strategy as IProductRepo).updateStock(targets);
  }

  readById(id: number): Promise<Result<Product>> {
    return (this.strategy as IProductRepo).readById(id);
  }

  add(product: IAddProduct): Promise<Result<boolean>> {
    return (this.strategy as IProductRepo).add(product);
  }
}
