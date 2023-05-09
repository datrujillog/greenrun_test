import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import UpdateUsersCommand from '../../Commands/Users/UpdateUsersCommand';
import UserRepositoryInterface from '../../../Domain/Interfaces/Repositories/UserRepositoryInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class UpdateUsersHandler {
  public constructor(@inject(INTERFACES.UserRepositoryInterface) private userRepository: UserRepositoryInterface) {}

  public async execute(command: UpdateUsersCommand): Promise<void> {
    var user = await this.userRepository.findOneByIdOrFail(command.getId());
    if (command.isFromAdmin() && user.role === USER_ROLES.ADMIN) {
      throw Boom.boomify(new Error('Admins do not have permissions to edit others admins data'), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Admins do not have permissions to edit others admins data',
      });
    }
    user.setFirstName(command.getFirstName());
    user.setLastName(command.getLastName());
    user.setPhone(command.getPhone());
    user.setEmail(command.getEmail());
    user.setUsername(command.getUsername());
    user.setAddress(command.getAddress());
    user.setGender(command.getGender());
    user.setBirthDate(command.getBirthDate());
    user.setCountryId(command.getCountryId());
    user.setCity(command.getCity());
    user.setCategory(command.getCategory());
    user.setDocumentId(command.getDocumentId());

    this.userRepository.update(user);
  }
}
