// region Platform Libraries
import {
  Column, DataType, HasMany, Model, Table, PrimaryKey,
} from 'sequelize-typescript';
// endregion

import { Product } from './Product';

@Table
export class Seller extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column
  declare createdAt: Date;

  @Column
  declare updatedAt: Date;

  @HasMany(() => Product)
  declare products: Product[];
}
