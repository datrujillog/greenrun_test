import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import BanUsersCommand from '../../../Application/Commands/Users/BanUsersCommand';
import BanUsersAdapter from '../../Adapters/Users/BanUsersAdapter';
import BanUsersHandler from '../../../Application/Handlers/Users/BanUsersHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class BanUsersAction {
  public readonly ROUTE_PATH = '/users/{id}/ban';
  public constructor(
    @inject(BanUsersAdapter) private adapter: BanUsersAdapter,
    @inject(BanUsersHandler) private handler: BanUsersHandler,
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
    const command: BanUsersCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
