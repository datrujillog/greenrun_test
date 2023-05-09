import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import GetTransactionQuery from '../../Commands/Transactions/GetTransactionQuery';
import TransactionRepositoryInterface from '../../../Domain/Interfaces/Repositories/TransactionRepositoryInterface';
import Transaction from '../../../Domain/Entities/Transaction';

@injectable()
export default class GetTransactionsHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
    @inject(INTERFACES.TransactionRepositoryInterface) private transactionRepository: TransactionRepositoryInterface,
  ) {}

  public async execute(command: GetTransactionQuery): Promise<Transaction[]> {
    await this.userRepository.findOneByIdOrFail(command.getUserId());
    return await this.transactionRepository.findBy(command.getParams());
  }
}
