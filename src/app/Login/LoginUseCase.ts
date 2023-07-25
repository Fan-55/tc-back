import { Result } from '../../base/Result';
import { IUseCase } from '../../base/app/IUseCase';
import { UserRole } from '../../base/domain/valueObjects/UserRole';
import { Buyer } from '../../domain/entities/Buyer';
import { BuyerRepo } from '../../infra/repos/BuyerRepo';
import { SellerRepo } from '../../infra/repos/SellerRepo';
import { ILoginUseCaseRequestDto } from './ILoginUseCaseRequestDto';

export class LoginUseCase implements IUseCase<ILoginUseCaseRequestDto, Result<Buyer>> {
  private buyerRepo: BuyerRepo;
  private sellerRepo: SellerRepo;

  constructor(buyerRepo: BuyerRepo, sellerRepo: SellerRepo) {
    this.buyerRepo = buyerRepo;
    this.sellerRepo = sellerRepo;
  }

  async execute(dto: ILoginUseCaseRequestDto): Promise<Result<Buyer>> {
    const { username, password, role } = dto;
    let userExistsResult;
    if (role === UserRole.Buyer) {
      userExistsResult = await this.buyerRepo.readByUsernameAndPassword(username, password);
    } else {
      userExistsResult = await this.sellerRepo.readByUsernameAndPassword(username, password);
    }
    if (!userExistsResult.isSuccessful) {
      return userExistsResult.error
        ? Result.Fail(userExistsResult.error)
        : Result.Fail(`encountered unexpected error when ${role === UserRole.Buyer ? UserRole.Buyer : UserRole.Seller}Repo.readByUsernameAndPassword while LoginUseCase.execute`, true);
    }
    return Result.Ok(userExistsResult.value);
  }
}
