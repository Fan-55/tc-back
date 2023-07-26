import { Result } from '../../base/Result';
import { IUseCase } from '../../base/app/IUseCase';
import { ProductRepo } from '../../infra/repos/ProductRepo';
import { IAddProductUseCaseRequestDto } from './IAddProductUseCaseRequestDto';

export class AddProductUseCase implements
  IUseCase<IAddProductUseCaseRequestDto, Result<boolean>> {
  private productRepo: ProductRepo;

  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(dto: IAddProductUseCaseRequestDto): Promise<Result<boolean>> {
    const {
      available, name, price, description, stock, sellerId,
    } = dto;
    const addProductResult = await this.productRepo.add({
      available, name, price, description, stock, sellerId,
    });
    if (!addProductResult.isSuccessful) {
      return addProductResult.error
        ? Result.Fail(addProductResult.error, addProductResult.isUnexpectedFailure)
        : Result.Fail('encountered unexpected error when productRepo.addById while AddProductUseCase.execute', true);
    }
    return Result.Ok(addProductResult.value);
  }
}
