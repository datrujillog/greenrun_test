import BetParamsInterface from '../Interfaces/BetParamsInterface';

export default class GetBetsQuery {
  private params: BetParamsInterface;

  public constructor(params: BetParamsInterface) {
    this.params = params;
  }

  public getParams(): BetParamsInterface {
    return this.params;
  }
}
