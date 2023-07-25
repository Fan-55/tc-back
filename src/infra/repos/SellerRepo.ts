// region Project Libraries
import { Seller as SellerModel } from '../../base/infra/mappers/models/Seller';
import { SequelizeConnection } from '../../base/infra/repos/SequelizeConnection';
import { IRepo, Repo } from '../../base/infra/repos/Repo';
import { Result } from '../../base/Result';
import { Seller } from '../../domain/entities/Seller';
import { SellerMapper } from '../mappers/SellerMapper';
// endregion

interface ISellerRepo extends IRepo {
  readByUsernameAndPassword(username: string, password: string): Promise<Result<Seller>>;
}

class SequelizeStrategy implements ISellerRepo {
  private isConnected: boolean = false;

  // region ISellerRepo implementation
  async readByUsernameAndPassword(username: string, password: string): Promise<Result<Seller>> {
    try {
      await this.ensureConnection();
      const foundSeller = await SellerModel.findOne({ where: { username, password } });
      if (foundSeller) {
        const mapSellerResult = SellerMapper.ToDomain(foundSeller);
        if (!mapSellerResult.value) {
          return mapSellerResult.error
            ? Result.Fail(mapSellerResult.error, mapSellerResult.isUnexpectedFailure)
            : Result.Fail('encountered unexpected error when SellerMapper.ToDomain when SellerRepo.readByUsernameAndPassword', true);
        }
        return Result.Ok(mapSellerResult.value);
      }
      return Result.Fail('seller not found');
    } catch (e) {
      return Result.Fail((e as Error).message ? (e as Error).message : 'encountered unexpected error when ProductRepo.readMany', true);
    }
  }
  // endregion

  private async ensureConnection(): Promise<void> {
    if (!this.isConnected) {
      try {
        const sequelize = SequelizeConnection.GetInstance();
        await sequelize.authenticate();
        this.isConnected = true;
      } catch {
        this.isConnected = false;
        throw new Error('db connection failed');
      }
    }
  }
}

export class SellerRepo extends Repo implements ISellerRepo {
  constructor() {
    super(SequelizeStrategy);
  }

  readByUsernameAndPassword(username: string, password: string) {
    return (this.strategy as ISellerRepo).readByUsernameAndPassword(username, password);
  }
}
