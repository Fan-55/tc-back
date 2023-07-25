// region Platform Libraries
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
// endregion

// region Project Libraries
import { Order } from './Order';
import { Product } from './Product';
// endregion

@Table
export class OrderItem extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  declare orderedPrice: number;

  @Column
  declare quantity: number;

  @ForeignKey(() => Order)
  @Column
  declare OrderId: number;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => Product)
  @Column
  declare ProductId: number;

  @BelongsTo(() => Product)
  declare product: Product;
}
