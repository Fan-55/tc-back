// region Platform Libraries
import { Request, Response } from 'express';
// endregion

import { BrowseProductsUseCase } from '../../../app/BrowseProducts/BrowseProductsUseCase';
import { IQuery } from './IBrowseProductsControllerRequestDto';
import { ExpressController } from '../../../base/infra/ExpressController';

export class BrowseProductsController {
  private useCase: BrowseProductsUseCase;

  constructor(useCase: BrowseProductsUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    const {
      q, minPrice, maxPrice, sellerId,
    } = req.query as IQuery;
    const minPriceNum = parseInt(minPrice || '', 10);
    const maxPriceNum = parseInt(maxPrice || '', 10);
    const sellerIdNum = parseInt(sellerId || '', 10);
    const dto = {
      q, minPrice: minPriceNum, maxPrice: maxPriceNum, sellerId: sellerIdNum,
    };
    const browseProductsResult = await this.useCase.execute(dto);
    if (!browseProductsResult.isSuccessful || !browseProductsResult.value) {
      return ExpressController.BadRequest(res, browseProductsResult.errorMessage);
    }
    const browseProductsControllerResponseDto = browseProductsResult.value?.map((product) => ({
      id: product.entityProps.id,
      available: product.available,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description,
      createdAt: product.entityProps.createdAt,
      updatedAt: product.entityProps.updatedAt,
    }));
    const responseDto = {
      _embedded: browseProductsControllerResponseDto,
    };
    return ExpressController.Ok(res, responseDto);
  }
}
