export default class WithdrawCommand {
  public user_id: number;
  public amount: number;

  public constructor(user_id: number, amount: number) {
    this.user_id = user_id;
    this.amount = amount;
  }

  public getUserId(): number {
    return this.user_id;
  }

  public getAmount(): number {
    return this.amount;
  }
}
