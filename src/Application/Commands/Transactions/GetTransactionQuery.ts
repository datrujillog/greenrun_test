import TransactionParamsInterface from '../Interfaces/TransactionParamsInterface';

export default class GetTransactionQuery {
  public user_id: number;
  public category: string;

  public constructor(user_id: number, category: string | null) {
    this.user_id = user_id;
    this.category = category;
  }

  public getUserId(): number {
    return this.user_id;
  }

  public getParams(): TransactionParamsInterface {
    return {
      user_id: this.user_id,
      category: this.category,
    };
  }
}
