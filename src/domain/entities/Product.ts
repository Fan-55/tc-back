// region Project Libraries
import { Entity, IEntityProps } from '../../base/domain/entities/Entity';
import { Result } from '../../base/Result';
// endregion

export interface IProductProps {
  available: boolean;
  name: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  SellerId: number;
}

export class Product extends Entity<IProductProps> {
  private constructor(props: IProductProps, entityProps: IEntityProps) {
    super(props, entityProps);
  }

  get available(): boolean {
    return this.props.available;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get image(): string {
    return this.props.image;
  }

  get description(): string {
    return this.props.description;
  }

  get stock(): number {
    return this.props.stock;
  }

  get SellerId(): number {
    return this.props.SellerId;
  }

  static Materialize(props: IProductProps, entityProps: IEntityProps): Result<Product> {
    return Result.Ok<Product>(new Product(props, entityProps));
  }
}
