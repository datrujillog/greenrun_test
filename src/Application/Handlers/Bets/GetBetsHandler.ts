import { inject, injectable } from 'inversify';
import Bet from '../../../Domain/Entities/Bet';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import GetBetsQuery from '../../Commands/Bets/GetBetsQuery';

@injectable()
export default class GetBetsHandler {
  public constructor(@inject(INTERFACES.BetRepositoryInterface) private betRepository: BetRepositoryInterface) {}

  public async execute(query: GetBetsQuery): Promise<Bet[]> {
    return await this.betRepository.findBy(query.getParams());
  }
}
