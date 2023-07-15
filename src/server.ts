// region Platform Libraries
import express, { Express } from 'express';
// endregion

export default class Server {
  private expressApp: Express;
  private port: number;

  constructor(port: number = 5000) {
    this.expressApp = express();
    this.port = port;
  }

  start() {
    this.expressApp.listen(this.port, () => { console.log(`server listen on port ${this.port}`) });
  }
}
