import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import Boom from '@hapi/boom';
import LoginUsersCommand from '../../Commands/Auth/LoginUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import bcrypt from 'bcrypt';
import User from '../../../Domain/Entities/User';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class LoginUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(command: LoginUsersCommand): Promise<User | null> {
    let user = await this.userRepository.findOneBy('username', command.getUsername());

    if (!user) {
      throw Boom.boomify(new Error(`User with username ${command.getUsername()} not found`), {
        statusCode: HTTP_CODES.NOT_FOUND,
        data: `User with username ${command.getUsername()} not found`,
      });
    }

    return bcrypt.compare(command.getPassword(), user.getPassword()) ? user : null;
  }
}
