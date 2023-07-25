// region Project Platform
import { IUseCase } from '../../base/app/IUseCase';
import { Result } from '../../base/Result';
import { Product } from '../../domain/entities/Product';
import { ProductRepo } from '../../infra/repos/ProductRepo';
import { IBrowseProductsUseCaseRequestDto } from './IBrowseProductsUseCaseRequestDto';
// endregion

export class BrowseProductsUseCase implements
  IUseCase<IBrowseProductsUseCaseRequestDto, Result<Product[]>> {
  private productRepo: ProductRepo;

  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(dto: IBrowseProductsUseCaseRequestDto): Promise<Result<Product[]>> {
    const {
      q, minPrice, maxPrice, sellerId,
    } = dto;
    const browseProductsResult = await this.productRepo.readMany({
      q, minPrice, maxPrice, sellerId,
    });
    if (!browseProductsResult.value) {
      return browseProductsResult.error
        ? Result.Fail(browseProductsResult.error, browseProductsResult.isUnexpectedFailure)
        : Result.Fail('encountered unexpected error when productRepo.readMany while BrowseProductsUseCase.execute', true);
    }
    return Result.Ok(browseProductsResult.value);
  }
}
