export default class Transaction {
  public id: number;

  public user_id: number;
  public amount: number;
  public category: string;
  public status: string;
  public email: string;
  public user_bet_id: number | null;

  public created_at: Date;

  public updated_at: Date;

  public deleted: boolean;

  public deleted_at: Date | null;

  constructor(user_id: number, amount: number, category: string, status: string, user_bet_id?: number | null) {
    this.user_id = user_id;
    this.amount = amount;
    this.category = category;
    this.status = status;
    this.user_bet_id = user_bet_id ? user_bet_id : null;
    this.created_at = new Date();
    this.updated_at = new Date();
    this.deleted = false;
    this.deleted_at = null;
  }

  public getId(): number {
    return this.id;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getStatus(): string {
    return this.status;
  }

  public getCategory(): string {
    return this.category;
  }
}
