import { Request, Response } from 'express';

import { CheckoutUseCase } from '../../../app/Checkout/CheckoutUseCase';
import { ExpressController } from '../../../base/infra/ExpressController';
import { IBody } from './ICheckoutControllerRequestDto';

export class CheckoutController {
  private useCase: CheckoutUseCase;

  constructor(useCase: CheckoutUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    const { cartItems } = req.body as IBody;
    const dto = {
      productsToBeUpdated: cartItems,
    };
    const checkoutResult = await this.useCase.execute(dto);
    if (!checkoutResult.isSuccessful) {
      return ExpressController.BadRequest(res, checkoutResult.errorMessage);
    }
    return ExpressController.Ok(res, checkoutResult.value);
  }
}
