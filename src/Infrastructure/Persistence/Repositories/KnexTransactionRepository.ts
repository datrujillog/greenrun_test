import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import { injectable } from 'inversify';
import databaseConnection from '../DatabaseConnection';
import Transaction from '../../../Domain/Entities/Transaction';
import TransactionParamsInterface from '../../../Application/Commands/Interfaces/TransactionParamsInterface';

@injectable()
export default class KnexTransactionRepository implements TransactionRepositoryInterface {
  private repository(): any {
    return databaseConnection<Transaction>('transactions').where('deleted', false);
  }

  public async findAll(): Promise<Transaction[]> {
    return await this.repository();
  }

  public async findOneById(id: number): Promise<Transaction> {
    return await this.repository().where('id', id).first();
  }

  public async findBy(params: TransactionParamsInterface): Promise<Transaction[]> {
    let whereClause = { user_id: params.user_id };
    if (params.category) {
      whereClause['category'] = params.category;
    }
    return await this.repository().where(whereClause);
  }

  public async persist(transaction: Transaction): Promise<number> {
    return await this.repository().insert(transaction);
  }

  public async delete(transaction: Transaction): Promise<boolean> {
    const result = await this.repository().where('id', transaction.getId()).update({
      deleted: true,
      deleted_at: new Date(),
    });

    return result && result.affected === 1;
  }
}
