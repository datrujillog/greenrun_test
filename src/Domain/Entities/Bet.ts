export default class Bet {
  public id: number;

  public bet_option: string;
  public sport: string;
  public status: string;
  public name: string;
  public event_id: number;
  public odd: number;
  public result: string | null;

  public created_at: Date;

  public updated_at: Date;

  public deleted: boolean;

  public deleted_at: Date | null;

  public constructor(
    bet_option: string,
    sport: string,
    status: string,
    name: string,
    event_id: number,
    odd: number,
    result?: string | null,
  ) {
    this.bet_option = bet_option;
    this.sport = sport;
    this.status = status;
    this.name = name;
    this.event_id = event_id;
    this.odd = odd;
    this.result = result ? result : null;

    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted = false;
    this.deleted_at = null;
  }

  public getId(): number {
    return this.id;
  }

  public getOdd(): number {
    return this.odd;
  }
}
