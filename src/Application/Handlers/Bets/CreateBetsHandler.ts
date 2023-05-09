import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { BET_STATUSES } from '../../../Domain/Interfaces/BetStatus';
import Bet from '../../../Domain/Entities/Bet';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import CreateBetsCommand from '../../Commands/Bets/CreateBetsCommand';

@injectable()
export default class CreateBetsHandler {
  public constructor(@inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface) {}

  public async execute(command: CreateBetsCommand): Promise<void> {
    const bet = new Bet(
      command.getBetOption(),
      command.getSport(),
      BET_STATUSES.ACTIVE,
      command.getName(),
      command.getEventId(),
      command.getOdd(),
    );
    this.betRepository.persist(bet);
  }
}
