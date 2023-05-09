import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import GetBetsQuery from '../../../Application/Commands/Bets/GetBetsQuery';
import GetBetsAdapter from '../../Adapters/Bets/GetBetsAdapter';
import GetBetsHandler from '../../../Application/Handlers/Bets/GetBetsHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class GetBetsAction {
  public readonly ROUTE_PATH = '/bets';
  public constructor(
    @inject(GetBetsAdapter) private adapter: GetBetsAdapter,
    @inject(GetBetsHandler) private handler: GetBetsHandler,
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
    const command: GetBetsQuery = this.adapter.from(request);
    const result = await this.handler.execute(command);
    return h.response(result).code(HTTP_CODES.OK);
  };
}
