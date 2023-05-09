import PlaceBetsInterface from '../Interfaces/PlaceBetsInterface';

export default class PlaceBetsCommand {
  public userId: number;
  public bets: PlaceBetsInterface[];

  public constructor(userId: number, bets: PlaceBetsInterface[]) {
    this.userId = userId;
    this.bets = bets;
  }

  public getUserId(): number {
    return this.userId;
  }

  public getBets(): PlaceBetsInterface[] {
    return this.bets;
  }
}
