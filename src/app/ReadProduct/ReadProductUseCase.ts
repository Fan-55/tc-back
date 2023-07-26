import { Result } from '../../base/Result';
import { IUseCase } from '../../base/app/IUseCase';
import { Product } from '../../domain/entities/Product';
import { ProductRepo } from '../../infra/repos/ProductRepo';
import { IReadProductUseCaseRequestDto } from './IReadProductUseCaseRequestDto';

export class ReadProductUseCase implements
  IUseCase<IReadProductUseCaseRequestDto, Result<Product>> {
  private productRepo: ProductRepo;

  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(dto: IReadProductUseCaseRequestDto): Promise<Result<Product>> {
    const { productId } = dto;
    const readProductResult = await this.productRepo.readById(productId);
    if (!readProductResult.isSuccessful) {
      return readProductResult.error
        ? Result.Fail(readProductResult.error, readProductResult.isUnexpectedFailure)
        : Result.Fail('encountered unexpected error when productRepo.readById while ReadProductUseCase.execute', true);
    }
    return Result.Ok(readProductResult.value);
  }
}
