import { inject, injectable } from 'inversify';
import { BET_STATUSES } from '../../../Domain/Interfaces/BetStatus';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UpdateBetsCommand from '../../Commands/Bets/UpdateBetsCommand';

@injectable()
export default class UpdateBetsHandler {
  public constructor(@inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface) {}

  public async execute(command: UpdateBetsCommand): Promise<void> {
    let bet = await this.betRepository.findOneByIdOrFail(command.getId());
    if (command.getStatus() && bet.status !== BET_STATUSES.SETTLED) {
      bet.status = command.getStatus();
    }
    if (command.getOdd()) {
      bet.odd = command.getOdd();
    }
    this.betRepository.update(bet);
  }
}
