import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import DepositCommand from '../../Commands/Transactions/DepositCommand';
import { TRANSACCIONS_CATEGORIES } from '../../../Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../../Domain/Interfaces/TransactionStatus';

@injectable()
export default class DepositHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService,
  ) {}

  public async execute(command: DepositCommand): Promise<void> {
    var user = await this.userRepository.findOneByIdOrFail(command.getUserId());

    this.transactionService.generateTransaction(
      user.getId(),
      command.getAmount(),
      TRANSACCIONS_CATEGORIES.DEPOSIT,
      TRANSACCIONS_STATUSES.COMPLETED,
    );
  }
}
