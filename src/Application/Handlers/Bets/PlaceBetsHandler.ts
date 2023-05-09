import { inject, injectable } from 'inversify';
import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import UserBet from '../../../Domain/Entities/UserBet';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import PlaceBetsCommand from '../../Commands/Bets/PlaceBetsCommand';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import TransactionService from '../../../Application/Services/Transactions/TransactionsService';
import { BET_STATUSES } from '../../../Domain/Interfaces/BetStatus';
import { USER_BET_STATUSES } from '../../../Domain/Interfaces/UserBetStatus';
import { TRANSACCIONS_CATEGORIES } from '../../../Domain/Interfaces/TransactionCategories';
import { TRANSACCIONS_STATUSES } from '../../../Domain/Interfaces/TransactionStatus';
import GetUsersBalanceHandler from '../Users/GetUsersBalanceHandler';
import GetUsersBalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';

@injectable()
export default class PlaceBetsHandler {
  public constructor(
    @inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface,
    @inject(INTERFACES.UserBetRepositoryInterface) private userBetRepository: UserBetRepositoryInterface,
    @inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface,
    @inject(TransactionService) private transactionService: TransactionService,
    @inject(GetUsersBalanceHandler) private getUsersBalanceHandler: GetUsersBalanceHandler,
  ) {}

  public async execute(command: PlaceBetsCommand): Promise<void> {
    var user = await this.userRepository.findOneByIdOrFail(command.getUserId());
    const bets = command.getBets();
    let userAvailableMoney = await this.getUsersBalanceHandler.execute(new GetUsersBalanceQuery(user.getId()));

    for (let currentBet of bets) {
      if (userAvailableMoney < currentBet.amount) {
        continue;
      }

      const bet = await this.betRepository.findOneByIdOrFail(currentBet.betId);
      if (!bet || bet.status !== BET_STATUSES.ACTIVE) {
        continue;
      }

      let userBet = new UserBet(user.getId(), currentBet.betId, bet.odd, currentBet.amount, USER_BET_STATUSES.OPEN);

      const userBetId = await this.userBetRepository.persist(userBet);
      this.transactionService.generateTransaction(
        user.getId(),
        currentBet.amount,
        TRANSACCIONS_CATEGORIES.BET,
        TRANSACCIONS_STATUSES.COMPLETED,
        userBetId,
      );
    }
  }
}
