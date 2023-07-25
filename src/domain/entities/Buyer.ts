// region Project Libraries
import { Entity, IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export interface IBuyerProps {
  username: string;
  password: string;
}

export class Buyer extends Entity<IBuyerProps> {
  private constructor(props: IBuyerProps, entityProps: IEntityProps) {
    super(props, entityProps);
  }

  get username(): string {
    return this.props.username;
  }

  get password(): string {
    return this.props.password;
  }

  static Materialize(props: IBuyerProps, entityProps: IEntityProps): Result<Buyer> {
    return Result.Ok<Buyer>(new Buyer(props, entityProps));
  }
}
