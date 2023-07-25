// region Platform Libraries
import cors from 'cors';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
// endregion

// region Project Libraries
import { v1 } from '../routers/v1';
// endregion

export default class ExpressServer {
  private expressApp: Express;
  private port: number;

  constructor(port: number = 5000) {
    this.expressApp = express();
    this.expressApp.use(cors());
    this.expressApp.use(bodyParser.json());
    this.expressApp.use('/v1', v1);
    this.port = port;
  }

  start() {
    // eslint-disable-next-line no-console
    this.expressApp.listen(this.port, () => console.log(`server listen on port ${this.port}`));
  }
}
