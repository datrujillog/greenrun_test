import TransactionParamsInterface from '../../../Application/Commands/Interfaces/TransactionParamsInterface';
import Transaction from '../../Entities/Transaction';

export default interface TransactionRepositoryInterface {
  findAll(): Promise<Transaction[]>;
  findOneById(id: number): Promise<Transaction>;
  findBy(params: TransactionParamsInterface): Promise<Transaction[]>;
  persist(transaction: Transaction): Promise<number>;
  delete(transaction: Transaction): Promise<boolean>;
}
