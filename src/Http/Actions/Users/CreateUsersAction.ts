import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import CreateUsersCommand from '../../../Application/Commands/Users/CreateUsersCommand';
import CreateUsersAdapter from '../../Adapters/Users/CreateUsersAdapter';
import CreateUsersHandler from '../../../Application/Handlers/Users/CreateUsersHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class CreateUsersAction {
  public readonly ROUTE_PATH = '/users';
  public constructor(
    @inject(CreateUsersAdapter) private adapter: CreateUsersAdapter,
    @inject(CreateUsersHandler) private handler: CreateUsersHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    if (request['current_user'].role !== USER_ROLES.ADMIN) {
      throw Boom.boomify(new Error('Unauthorized user'), {
        statusCode: HTTP_CODES.CONFLICT,
        data: 'Unauthorized user',
      });
    }
    const command: CreateUsersCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.CREATED);
  };
}
