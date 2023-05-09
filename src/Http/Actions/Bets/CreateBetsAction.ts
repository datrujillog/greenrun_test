import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import CreateBetsCommand from '../../../Application/Commands/Bets/CreateBetsCommand';
import CreateBetsAdapter from '../../Adapters/Bets/CreateBetsAdapter';
import CreateBetsHandler from '../../../Application/Handlers/Bets/CreateBetsHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class CreateBetsAction {
  public readonly ROUTE_PATH = '/bets';
  public constructor(
    @inject(CreateBetsAdapter) private adapter: CreateBetsAdapter,
    @inject(CreateBetsHandler) private handler: CreateBetsHandler,
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
    const command: CreateBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
