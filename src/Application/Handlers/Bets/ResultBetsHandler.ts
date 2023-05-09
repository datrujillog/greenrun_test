import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import ResultBetsCommand from '../../Commands/Bets/ResultBetsCommand';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import { BET_STATUSES } from '../../../Domain/Interfaces/BetStatus';
import { TRANSACCIONS_CATEGORIES } from '../../../Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../../Domain/Interfaces/TransactionStatus';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class ResultBetHandler {
  public constructor(
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface,
    @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService,
  ) {}

  public async execute(command: ResultBetsCommand): Promise<void> {
    let bet = await this.betRepository.findOneByIdOrFail(command.getId());
    if (bet.status !== BET_STATUSES.ACTIVE) {
      throw Boom.boomify(new Error('Status is not active'), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Status is not active',
      });
    }
    bet.status = BET_STATUSES.SETTLED;
    bet.result = command.getResult();
    await this.betRepository.update(bet);

    const userBets = await this.userBetRepository.findBy({ bet_id: 1 });
    for (let currentUserBet of userBets) {
      this.transactionService.generateTransaction(
        currentUserBet.user_id,
        currentUserBet.amount,
        TRANSACCIONS_CATEGORIES.BET,
        TRANSACCIONS_STATUSES.COMPLETED,
        currentUserBet.id,
      );
    }
  }
}
