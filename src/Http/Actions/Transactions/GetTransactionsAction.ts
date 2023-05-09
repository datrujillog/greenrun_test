import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import GetTransactionQuery from '../../../Application/Commands/Transactions/GetTransactionQuery';
import GetTransactionsAdapter from '../../Adapters/Transactions/GetTransactionsAdapter';
import GetTransactionsHandler from '../../../Application/Handlers/Transactions/GetTransactionsHandler';

@injectable()
export default class GetTransactionsAction {
  public readonly ROUTE_PATH = '/users/transactions';
  public constructor(
    @inject(GetTransactionsAdapter) private adapter: GetTransactionsAdapter,
    @inject(GetTransactionsHandler) private handler: GetTransactionsHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: GetTransactionQuery = this.adapter.from(request);
    const result = await this.handler.execute(command);
    return h.response(result).code(HTTP_CODES.OK);
  };
}
