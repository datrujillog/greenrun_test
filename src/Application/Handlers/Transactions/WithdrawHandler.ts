import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import DepositCommand from '../../Commands/Transactions/DepositCommand';
import { TRANSACCIONS_CATEGORIES } from '../../../Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../../Domain/Interfaces/TransactionStatus';
import GetUsersBalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';
import GetUsersBalanceHandler from '../Users/GetUsersBalanceHandler';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class WithdrawHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService,
    @inject(GetUsersBalanceHandler) private getUsersBalanceHandler: GetUsersBalanceHandler,
  ) {}

  public async execute(command: DepositCommand): Promise<void> {
    var user = await this.userRepository.findOneByIdOrFail(command.getUserId());

    let userAvailableMoney = await this.getUsersBalanceHandler.execute(new GetUsersBalanceQuery(user.getId()));

    if (userAvailableMoney < command.getAmount()) {
      throw Boom.boomify(new Error('Not enought money available for withdraw that specific ammount'), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Not enought money available for withdraw that specific ammount',
      });
    }

    this.transactionService.generateTransaction(
      user.getId(),
      command.getAmount(),
      TRANSACCIONS_CATEGORIES.WITHDRAW,
      TRANSACCIONS_STATUSES.COMPLETED,
    );
  }
}
