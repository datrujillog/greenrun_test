import { inject, injectable } from 'inversify';
import User from '../../../Domain/Entities/User';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';

@injectable()
export default class GetUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
