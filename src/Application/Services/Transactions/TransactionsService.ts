import { inject, injectable } from 'inversify';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import Transaction from '../../../Domain/Entities/Transaction';

@injectable()
export default class TransactionService {
  constructor(
    @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface,
  ) {}

  public generateTransaction(
    user_id: number,
    amount: number,
    category: string,
    status: string,
    user_bet_id?: number | null,
  ): void {
    this.transactionRepository.persist(new Transaction(user_id, amount, category, status, user_bet_id));
  }
}
