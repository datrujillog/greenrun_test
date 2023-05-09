import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import PlaceBetsCommand from '../../../Application/Commands/Bets/PlaceBetsCommand';
import PlaceBetsAdapter from '../../Adapters/Bets/PlaceBetsAdapter';
import PlaceBetsHandler from '../../../Application/Handlers/Bets/PlaceBetsHandler';

@injectable()
export default class PlaceBetsAction {
  public readonly ROUTE_PATH = '/users/bets';
  public constructor(
    @inject(PlaceBetsAdapter) private adapter: PlaceBetsAdapter,
    @inject(PlaceBetsHandler) private handler: PlaceBetsHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: PlaceBetsCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
