import { Result } from '../../base/Result';
import { IUseCase } from '../../base/app/IUseCase';
import { ProductRepo } from '../../infra/repos/ProductRepo';
import { IEditProductUseCaseRequestDto } from './IEditProductUseCaseRequestDto';

export class EditProductUseCase implements
  IUseCase<IEditProductUseCaseRequestDto, Result<boolean>> {
  private productRepo: ProductRepo;

  constructor(productRepo: ProductRepo) {
    this.productRepo = productRepo;
  }

  async execute(dto: IEditProductUseCaseRequestDto): Promise<Result<boolean>> {
    const {
      id, available, name, price, description, stock,
    } = dto;
    const editProductResult = await this.productRepo.editById(id, {
      available, name, price, description, stock,
    });
    if (!editProductResult.isSuccessful) {
      return editProductResult.error
        ? Result.Fail(editProductResult.error, editProductResult.isUnexpectedFailure)
        : Result.Fail('encountered unexpected error when productRepo.editById while EditProductUseCase.execute', true);
    }
    return Result.Ok(editProductResult.value);
  }
}
