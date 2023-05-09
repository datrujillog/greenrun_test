import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import UpdateUsersCommand from '../../../Application/Commands/Users/UpdateUsersCommand';
import UpdateUsersAdapter from '../../Adapters/Users/UpdateUsersAdapter';
import UpudateUsersHandler from '../../../Application/Handlers/Users/UpudateUsersHandler';

@injectable()
export default class UpdateUserAction {
  public readonly ROUTE_PATH = '/users/{id}';
  public constructor(
    @inject(UpdateUsersAdapter) private adapter: UpdateUsersAdapter,
    @inject(UpudateUsersHandler) private handler: UpudateUsersHandler,
  ) {}

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: UpdateUsersCommand = this.adapter.from(request);
    await this.handler.execute(command);
    return h.response().code(HTTP_CODES.OK);
  };
}
