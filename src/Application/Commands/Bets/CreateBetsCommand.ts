export default class CreateBetsCommand {
  public bet_option: string;
  public sport: string;
  public name: string;
  public event_id: number;
  public odd: number;

  public constructor(bet_option: string, sport: string, name: string, event_id: number, odd: number) {
    this.bet_option = bet_option;
    this.sport = sport;
    this.name = name;
    this.event_id = event_id;
    this.odd = odd;
  }

  public getBetOption(): string {
    return this.bet_option;
  }

  public getSport(): string {
    return this.sport;
  }

  public getName(): string {
    return this.name;
  }

  public getEventId(): number {
    return this.event_id;
  }

  public getOdd(): number {
    return this.odd;
  }
}
