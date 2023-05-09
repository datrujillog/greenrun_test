import Boom from '@hapi/boom';
import BetRepositoryInterface from '../../../Domain/Interfaces/Repositories/BetRepositoryInterface';
import { injectable } from 'inversify';
import databaseConnection from '../DatabaseConnection';
import Bet from '../../../Domain/Entities/Bet';
import BetParamsInterface from '../../../Application/Commands/Interfaces/BetParamsInterface';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class KnexBetRepository implements BetRepositoryInterface {
  private repository(): any {
    return databaseConnection<Bet>('bets').where('deleted', false);
  }

  public async findAll(): Promise<Bet[]> {
    return await this.repository();
  }

  public async findOneByIdOrFail(id: number): Promise<Bet> {
    const result = await this.repository().where('id', id).first();
    if (result) {
      return result;
    }
    throw Boom.boomify(new Error(`Bet with id ${id} not found`), {
      statusCode: HTTP_CODES.NOT_FOUND,
      data: `Bet with id ${id} not found`,
    });
  }

  public async findBy(params: BetParamsInterface): Promise<Bet[]> {
    let whereClause = {};
    if (params.event_id) {
      whereClause['event_id'] = params.event_id;
    }
    if (params.sport) {
      whereClause['sport'] = params.sport;
    }
    return await this.repository().where(whereClause);
  }

  public async persist(bet: Bet): Promise<number> {
    return await this.repository().insert(bet);
  }

  public async update(bet: Bet): Promise<void> {
    await this.repository().where('id', bet.id).update(bet);
  }

  public async delete(bet: Bet): Promise<boolean> {
    const result = await this.repository().where('id', bet.getId()).update({
      deleted: true,
      deleted_at: new Date(),
    });

    return result && result.affected === 1;
  }
}
