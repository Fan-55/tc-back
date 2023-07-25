// region Project Libraries
import { Entity, IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export interface ISellerProps {
  username: string;
  password: string;
}

export class Seller extends Entity<ISellerProps> {
  private constructor(props: ISellerProps, entityProps: IEntityProps) {
    super(props, entityProps);
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  static Materialize(props: ISellerProps, entityProps: IEntityProps): Result<Seller> {
    return Result.Ok<Seller>(new Seller(props, entityProps));
  }
}
