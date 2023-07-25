// region Project Libraries
import { ISellerProps, Seller } from '../../domain/entities/Seller';
import { Seller as SellerModel } from '../../base/infra/mappers/models/Seller';
import { IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export class SellerMapper {
  static ToDomain(row: SellerModel): Result<Seller> {
    const sellerProps: ISellerProps = {
      username: row.username,
      password: row.password,
    };
    const entityProps: IEntityProps = {
      id: row.id,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    const materializeSellerResult = Seller.Materialize(sellerProps, entityProps);
    if (!materializeSellerResult.value) {
      return materializeSellerResult.error
        ? Result.Fail(materializeSellerResult.error)
        : Result.Fail('encountered unexpected error when Product.Materialize while SellerMapper.ToDomain', true);
    }
    return Result.Ok(materializeSellerResult.value);
  }
}
