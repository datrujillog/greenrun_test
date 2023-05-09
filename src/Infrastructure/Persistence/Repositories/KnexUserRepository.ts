import Boom from '@hapi/boom';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import User from '../../../Domain/Entities/User';
import { injectable } from 'inversify';
import databaseConnection from '../DatabaseConnection';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class KnexUserRepository implements UserRepositoryInterface {
  private repository(): any {
    return databaseConnection<User>('users').where('deleted', false);
  }

  public async findAll(): Promise<User[]> {
    return await this.repository().select();
  }

  public async findOneByIdOrFail(id: number): Promise<User> {
    const result = await this.repository().where('id', id).first();
    if (result) {
      return this.entityFromRawData(result);
    }
    throw Boom.boomify(new Error(`User with id ${id} not found`), {
      statusCode: HTTP_CODES.NOT_FOUND,
      data: `User with id ${id} not found`,
    });
  }

  public async findOneBy(key: string, value: string | number | null): Promise<User | null> {
    const result = await this.repository().where(key, value).first();
    if (result) {
      return this.entityFromRawData(result);
    }
    return null;
  }

  public async persist(user: User): Promise<number> {
    return await this.repository().insert(user);
  }

  public async update(user: User): Promise<void> {
    await this.repository().where('id', user.getId()).update(user);
  }

  public async delete(user: User): Promise<boolean> {
    const result = await this.repository().where('id', user.getId()).update({
      deleted: true,
      deleted_at: new Date(),
    });

    return result && result.affected === 1;
  }

  private entityFromRawData(raw: any): User {
    let user = new User(
      raw.role,
      raw.first_name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.username,
      raw.password,
      raw.address,
      raw.gender,
      raw.birth_date,
      raw.country_id,
      raw.city,
      raw.category,
      raw.document_id,
      raw.user_state,
    );
    user.setId(raw.id);
    user.setCreatedAt(raw.created_at);
    user.setUpdatedAt(raw.updated_at);
    return user;
  }
}
