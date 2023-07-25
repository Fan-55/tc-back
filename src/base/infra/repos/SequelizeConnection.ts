import { Sequelize } from 'sequelize-typescript';
import modelMap from '../mappers/models';

export class SequelizeConnection {
  private static instance: Sequelize;

  public static GetInstance(): Sequelize {
    if (!this.instance) {
      const modelsArray = Object.values(modelMap);
      const sequelize = new Sequelize({
        database: 'tc',
        dialect: 'mysql',
        username: 'root',
        password: 'password',
        models: modelsArray,
      });
      this.instance = sequelize;
    }
    return this.instance;
  }
}
