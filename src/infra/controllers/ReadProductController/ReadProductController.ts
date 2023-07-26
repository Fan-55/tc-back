import { Request, Response } from 'express';

import { ReadProductUseCase } from '../../../app/ReadProduct/ReadProductUseCase';
import { IParam } from './IReadProductController';
import { ExpressController } from '../../../base/infra/ExpressController';

export class ReadProductController {
  private useCase: ReadProductUseCase;

  constructor(useCase: ReadProductUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    const { id } = req.params as unknown as IParam;
    const readProductResult = await this.useCase.execute({ productId: id });
    if (!readProductResult.value) {
      return ExpressController.BadRequest(res, readProductResult.errorMessage);
    }
    const product = readProductResult.value;
    const responseDto = {
      id: product.entityProps.id,
      createdAt: product.entityProps.createdAt,
      updatedAt: product.entityProps.updatedAt,
      price: product.price,
      stock: product.stock,
      name: product.name,
      available: product.available,
      image: product.image,
      description: product.description,
    };
    return ExpressController.Ok(res, responseDto);
  }
}
