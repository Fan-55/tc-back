// region Project Platform
import { Result } from '../../base/Result';
import { IUseCase } from '../../base/app/IUseCase';
import { ProductRepo } from '../../infra/repos/ProductRepo';
import { ICheckoutUseCaseRequestDto } from './ICheckoutUseCaseRequestDto';
// endregion

export class CheckoutUseCase implements IUseCase<ICheckoutUseCaseRequestDto, Result<boolean>> {
  private productRepo: ProductRepo;

  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(dto: ICheckoutUseCaseRequestDto): Promise<Result<boolean>> {
    const { productsToBeUpdated } = dto;
    const updateStockResult = await this.productRepo.updateStock(productsToBeUpdated);
    if (!updateStockResult.isSuccessful) {
      return updateStockResult.error
        ? Result.Fail(updateStockResult.error, updateStockResult.isUnexpectedFailure)
        : Result.Fail('encountered unexpected error when CheckoutUseCase.execute', true);
    }
    return Result.Ok(true);
  }
}
