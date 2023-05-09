import TransactionParamsInterface from '../Interfaces/TransactionParamsInterface';

export default class GetUsersBalanceQuery {
  public user_id: number;

  public constructor(user_id: number) {
    this.user_id = user_id;
  }

  public getUserId(): number {
    return this.user_id;
  }

  public getParams(): TransactionParamsInterface {
    return {
      user_id: this.user_id,
    };
  }
}
