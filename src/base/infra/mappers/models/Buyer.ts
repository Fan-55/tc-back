// region Platform Libraries
import {
  Column, DataType, Model, Table, PrimaryKey,
} from 'sequelize-typescript';
// endregion

@Table
export class Buyer extends Model {
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
}
