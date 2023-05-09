import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import UpdateBetsCommand from '../../../Application/Commands/Bets/UpdateBetsCommand';
import UpdateBetsAdapter from '../../Adapters/Bets/UpdateBetsAdapter';
import UpdateBetsHandler from '../../../Application/Handlers/Bets/UpdateBetsHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class UpdateBetsAction {
  public readonly ROUTE_PATH = '/bets/{id}';
  public constructor(
    @inject(UpdateBetsAdapter) private adapter: UpdateBetsAdapter,
    @inject(UpdateBetsHandler) private handler: UpdateBetsHandler,
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
    const command: UpdateBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
