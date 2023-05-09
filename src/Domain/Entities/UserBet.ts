export default class UserBet {
  public id: number;

  public user_id: number;
  public bet_id: number;
  public odd: number;
  public amount: number;
  public state: string;

  public created_at: Date;

  public updated_at: Date;

  public deleted: boolean;

  public deleted_at: Date | null;

  constructor(user_id: number, bet_id: number, odd: number, amount: number, state: string) {
    this.user_id = user_id;
    this.bet_id = bet_id;
    this.odd = odd;
    this.amount = amount;
    this.state = state;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted = false;
    this.deleted_at = null;
  }

  public getId(): number {
    return this.id;
  }
}
