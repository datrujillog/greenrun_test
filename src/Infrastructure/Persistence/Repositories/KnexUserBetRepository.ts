import UserBetRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserBetRepositoryInterface';
import { injectable } from 'inversify';
import databaseConnection from '../DatabaseConnection';
import UserBet from '../../../Domain/Entities/UserBet';
import UserBetParamsInterface from '../../../Application/Commands/Interfaces/UserBetParamsInterface';

@injectable()
export default class KnexUserBetRepository implements UserBetRepositoryInterface {
  private repository(): any {
    return databaseConnection<UserBet>('user_bets').where('deleted', false);
  }

  public async findAll(): Promise<UserBet[]> {
    return await this.repository();
  }

  public async findOneById(id: number): Promise<UserBet> {
    return await this.repository().where('id', id).first();
  }

  public async findBy(params: UserBetParamsInterface): Promise<UserBet[]> {
    let whereClause = {};
    if (params.bet_id) {
      whereClause['bet_id'] = params.bet_id;
    }
    return await this.repository().where(whereClause);
  }

  public async persist(userBet: UserBet): Promise<number> {
    return await this.repository().insert(userBet);
  }

  public async delete(userBet: UserBet): Promise<boolean> {
    const result = await this.repository().where('id', userBet.getId()).update({
      deleted: true,
      deleted_at: new Date(),
    });

    return result && result.affected === 1;
  }
}
