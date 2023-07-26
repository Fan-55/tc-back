import { Request, Response } from 'express';

import { AddProductUseCase } from '../../../app/AddProduct/AddProductUseCase';
import { IAddProductControllerRequestDto } from './IAddProductControllerRequestDto';
import { ExpressController } from '../../../base/infra/ExpressController';

export class AddProductController {
  private useCase: AddProductUseCase;

  constructor(useCase: AddProductUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    const {
      available, name, price, description, stock, sellerId,
    } = req.body as IAddProductControllerRequestDto;
    const addProductResult = await this.useCase.execute({
      available, name, price, description, stock, sellerId,
    });
    if (!addProductResult.value) {
      return ExpressController.BadRequest(res, addProductResult.errorMessage);
    }
    return ExpressController.Ok(res);
  }
}
