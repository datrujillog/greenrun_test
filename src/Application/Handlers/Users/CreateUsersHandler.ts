import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import User from '../../../Domain/Entities/User';
import CreateUsersCommand from '../../Commands/Users/CreateUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class CreateUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(command: CreateUsersCommand): Promise<void> {
    if (await this.userRepository.findOneBy('username', command.getUsername())) {
      throw Boom.boomify(new Error('Duplicated entity with same username: ' + command.getUsername()), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Duplicated entity with same username: ' + command.getUsername(),
      });
    }
    if (await this.userRepository.findOneBy('email', command.getEmail())) {
      throw Boom.boomify(new Error('Duplicated entity  with same email: ' + command.getEmail()), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Duplicated entity  with same email: ' + command.getEmail(),
      });
    }
    if (await this.userRepository.findOneBy('document_id', command.getDocumentId())) {
      throw Boom.boomify(new Error('Duplicated entity  with same document id: ' + command.getDocumentId()), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Duplicated entity  with same document id: ' + command.getDocumentId(),
      });
    }
    const user = new User(
      command.getRole(),
      command.getFirstName(),
      command.getLastName(),
      command.getPhone(),
      command.getEmail(),
      command.getUsername(),
      command.getPassword(),
      command.getAddress(),
      command.getGender(),
      command.getBirthDate(),
      command.getCountryId(),
      command.getCity(),
      command.getCategory(),
      command.getDocumentId(),
    );
    this.userRepository.persist(user);
  }
}
