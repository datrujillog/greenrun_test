import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import GetUsersbalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';
import GetUsersBalanceAdapter from '../../Adapters/Users/GetUsersBalanceAdapter';
import GetUsersBalanceHandler from '../../../Application/Handlers/Users/GetUsersBalanceHandler';

@injectable()
export default class GetUsersBalanceAction {
  public readonly ROUTE_PATH = '/users/balance';
  public constructor(
    @inject(GetUsersBalanceAdapter) private adapter: GetUsersBalanceAdapter,
    @inject(GetUsersBalanceHandler) private handler: GetUsersBalanceHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: GetUsersbalanceQuery = this.adapter.from(request);
    const result = await this.handler.execute(command);
    return h.response({ userBalance: result }).code(HTTP_CODES.OK);
  };
}
