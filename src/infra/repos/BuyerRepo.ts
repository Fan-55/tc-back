// region Project Libraries
import { Buyer as BuyerModel } from '../../base/infra/mappers/models/Buyer';
import { SequelizeConnection } from '../../base/infra/repos/SequelizeConnection';
import { IRepo, Repo } from '../../base/infra/repos/Repo';
import { Result } from '../../base/Result';
import { Buyer } from '../../domain/entities/Buyer';
import { BuyerMapper } from '../mappers/BuyerMapper';
// endregion

interface IBuyerRepo extends IRepo {
  readByUsernameAndPassword(username: string, password: string): Promise<Result<Buyer>>;
}

class SequelizeStrategy implements IBuyerRepo {
  private isConnected: boolean = false;

  // region IBuyerRepo implementation
  async readByUsernameAndPassword(username: string, password: string): Promise<Result<Buyer>> {
    try {
      await this.ensureConnection();
      const foundBuyer = await BuyerModel.findOne({ where: { username, password } });
      if (foundBuyer) {
        const mapBuyerResult = BuyerMapper.ToDomain(foundBuyer);
        if (!mapBuyerResult.value) {
          return mapBuyerResult.error
            ? Result.Fail(mapBuyerResult.error, mapBuyerResult.isUnexpectedFailure)
            : Result.Fail('encountered unexpected error when BuyerMapper.ToDomain when BuyerRepo.readByUsernameAndPassword', true);
        }
        return Result.Ok(mapBuyerResult.value);
      }
      return Result.Fail('buyer not found');
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

export class BuyerRepo extends Repo implements IBuyerRepo {
  constructor() {
    super(SequelizeStrategy);
  }

  readByUsernameAndPassword(username: string, password: string) {
    return (this.strategy as IBuyerRepo).readByUsernameAndPassword(username, password);
  }
}
