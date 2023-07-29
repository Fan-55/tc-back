// region Platform Libraries
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// endregion

import { IBody } from './ILoginControllerRequestDto';
import { LoginUseCase } from '../../../app/Login/LoginUseCase';
import { UserRole } from '../../../base/domain/valueObjects/UserRole';
import { ExpressController } from '../../../base/infra/ExpressController';

export class LoginController {
  private tokenSigningKey = process.env.TOKEN_SIGNING_KEY as string;
  private useCase: LoginUseCase;

  constructor(useCase: LoginUseCase) {
    this.useCase = useCase;
  }

  async execute(req: Request, res: Response) {
    try {
      const { username, password, role } = req.body as IBody;
      const userExistResult = await this.useCase.execute({ username, password, role: role === 'buyer' ? UserRole.Buyer : UserRole.Seller });
      if (!userExistResult.isSuccessful || !userExistResult.value) {
        return ExpressController.BadRequest(res, userExistResult.errorMessage);
      }

      const token = jwt.sign(
        { sellerId: userExistResult.value.entityProps.id },
        this.tokenSigningKey,
        { expiresIn: '7D' },
      );
      return ExpressController.Ok(res, { userId: userExistResult.value.entityProps.id, token });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'encountered unexpected error when LoginController.execute';
      return ExpressController.InternalServerError(res, errorMessage);
    }
  }
}
