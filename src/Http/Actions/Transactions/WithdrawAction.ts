import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import WithdrawCommand from '../../../Application/Commands/Transactions/WithdrawCommand';
import WithdrawAdapter from '../../Adapters/Transactions/WithdrawAdapter';
import WithdrawHandler from '../../../Application/Handlers/Transactions/WithdrawHandler';

@injectable()
export default class WithdrawAction {
  public readonly ROUTE_PATH = '/withdraw';
  public constructor(
    @inject(WithdrawAdapter) private adapter: WithdrawAdapter,
    @inject(WithdrawHandler) private handler: WithdrawHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: WithdrawCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
