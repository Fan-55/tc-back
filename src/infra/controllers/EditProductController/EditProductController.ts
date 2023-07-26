import { Request, Response } from 'express';
import { EditProductUseCase } from '../../../app/EditProduct/EditProductUseCase';
import { IEditProductControllerRequestDto } from './IEditProductControllerRequestDto';
import { ExpressController } from '../../../base/infra/ExpressController';

export class EditProductController {
  private useCase: EditProductUseCase;

  constructor(useCase: EditProductUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    const {
      id, available, name, price, description, stock,
    } = req.body as IEditProductControllerRequestDto;
    const editProductResult = await this.useCase.execute({
      id, available, name, price, description, stock,
    });
    if (!editProductResult.value) {
      return ExpressController.BadRequest(res, editProductResult.errorMessage);
    }
    return ExpressController.Ok(res);
  }
}
