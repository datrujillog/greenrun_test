import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import DepositCommand from '../../../Application/Commands/Transactions/DepositCommand';
import DepositAdapter from '../../Adapters/Transactions/DepositAdapter';
import DepositHandler from '../../../Application/Handlers/Transactions/DepositHandler';

@injectable()
export default class DepositAction {
  public readonly ROUTE_PATH = '/deposit';
  public constructor(
    @inject(DepositAdapter) private adapter: DepositAdapter,
    @inject(DepositHandler) private handler: DepositHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: DepositCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
