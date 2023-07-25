// region Project Libraries
import { IProductProps, Product } from '../../domain/entities/Product';
import { Product as ProductModel } from '../../base/infra/mappers/models/Product';
import { IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export class ProductMapper {
  static ToDomain(row: ProductModel): Result<Product> {
    const productProps: IProductProps = {
      available: row.available,
      name: row.name,
      price: row.price,
      image: row.image,
      description: row.description,
      stock: row.stock,
      SellerId: row.SellerId,
    };
    const entityProps: IEntityProps = {
      id: row.id,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    const materializeProductResult = Product.Materialize(productProps, entityProps);
    if (!materializeProductResult.value) {
      return materializeProductResult.error
        ? Result.Fail(materializeProductResult.error)
        : Result.Fail('encountered unexpected error when Product.Materialize while ProductMapper.ToDomain', true);
    }
    return Result.Ok(materializeProductResult.value);
  }
}
