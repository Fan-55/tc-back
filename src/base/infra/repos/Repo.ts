export interface IRepo {}

export abstract class Repo implements IRepo {
  protected strategy: IRepo;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(Strategy: { new(...args: any[]): IRepo }) {
    this.strategy = new Strategy();
  }
}
