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
import { Seller } from './Seller';
// endregion

@Table
export class Product extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Column
  declare available: boolean;

  @Column
  declare name: string;

  @Column
  declare price: number;

  @Column
  declare image: string;

  @Column
  declare description: string;

  @Column
  declare stock: number;

  @ForeignKey(() => Seller)
  @Column
  declare SellerId: number;

  @Column
  declare createdAt: Date;

  @Column
  declare updatedAt: Date;

  @BelongsTo(() => Seller)
  declare seller: Seller;
}
