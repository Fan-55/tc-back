// region Project Libraries
import { IBuyerProps, Buyer } from '../../domain/entities/Buyer';
import { Buyer as BuyerModel } from '../../base/infra/mappers/models/Buyer';
import { IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export class BuyerMapper {
  static ToDomain(row: BuyerModel): Result<Buyer> {
    const buyerProps: IBuyerProps = {
      username: row.username,
      password: row.password,
    };
    const entityProps: IEntityProps = {
      id: row.id,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
    const materializeBuyerResult = Buyer.Materialize(buyerProps, entityProps);
    if (!materializeBuyerResult.value) {
      return materializeBuyerResult.error
        ? Result.Fail(materializeBuyerResult.error)
        : Result.Fail('encountered unexpected error when Product.Materialize while BuyerMapper.ToDomain', true);
    }
    return Result.Ok(materializeBuyerResult.value);
  }
}
