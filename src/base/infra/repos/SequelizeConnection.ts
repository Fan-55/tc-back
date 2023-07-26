import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

import modelMap from '../mappers/models';

export class SequelizeConnection {
  private static instance: Sequelize;

  public static GetInstance(): Sequelize {
    if (!this.instance) {
      const modelsArray = Object.values(modelMap);
      const sequelize = new Sequelize({
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        dialect: process.env.DB_TYPE as Dialect,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        models: modelsArray,
      });
      this.instance = sequelize;
    }
    return this.instance;
  }
}
