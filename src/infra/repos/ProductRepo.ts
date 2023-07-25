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

interface IProductRepo extends IRepo {
  readMany(queryOptions: IQueryOptions): Promise<Result<Product[]>>;
  updateStock(targets: IUpdateStockTarget[]): Promise<Result<boolean>>;
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
}
