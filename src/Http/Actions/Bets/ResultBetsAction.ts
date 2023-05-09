import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import ResultBetsCommand from '../../../Application/Commands/Bets/ResultBetsCommand';
import ResultBetsAdapter from '../../Adapters/Bets/ResultBetsAdapter';
import ResultBetsHandler from '../../../Application/Handlers/Bets/ResultBetsHandler';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';

@injectable()
export default class ResultBetsAction {
  public readonly ROUTE_PATH = '/bets/{id}/result';
  public constructor(
    @inject(ResultBetsAdapter) private adapter: ResultBetsAdapter,
    @inject(ResultBetsHandler) private handler: ResultBetsHandler,
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
    const command: ResultBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
