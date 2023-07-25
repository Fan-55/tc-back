// region Platform Libraries
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
// endregion

// region Project Libraries
import { Buyer } from './Buyer';
import { OrderItem } from './OrderItem';
import { Product } from './Product';
// endregion

@Table
export class Order extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Buyer)
  @Column
  declare BuyerId: number;

  @BelongsTo(() => Buyer)
  declare buyer: Buyer;

  @HasMany(() => OrderItem)
  declare items: OrderItem[];

  @BelongsToMany(() => Product, () => OrderItem)
  declare products: Product[];
}
