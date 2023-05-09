import { inject, injectable } from 'inversify';
import { HTTP_CODES } from '../../Enums/HttpStatusCode';
import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi';
import LoginUsersCommand from '../../../Application/Commands/Auth/LoginUsersCommand';
import LoginUsersAdapter from '../../Adapters/Auth/LoginUserAdapter';
import LoginUsersHandler from '../../../Application/Handlers/Auth/LoginUsersHandler';
import * as jwt from 'jsonwebtoken';
import { RedisConnectionInterface } from '../../../Infrastructure/Persistence/RedisConnectionInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import { timeStamp } from 'console';

@injectable()
export default class LoginUsersAction {
  public readonly ROUTE_PATH = '/login';
  public constructor(
    @inject(LoginUsersAdapter) private adapter: LoginUsersAdapter,
    @inject(LoginUsersHandler) private handler: LoginUsersHandler,
    @inject(INTERFACES.RedisConnectionInterface) private redisClient: RedisConnectionInterface,
  ) { }

  public execute = async (
    request: Request, 
    h: ResponseToolkit
    ): Promise<ResponseObject> => {
    const command: LoginUsersCommand = this.adapter.from(request);
    const result = await this.handler.execute(command);
    if (result) {
      const token = jwt.sign({ tick: timeStamp() }, process.env.JWT_SECRET);
      this.redisClient.getConnection().set(token, result.getId());
      return h
        .response({
          token: token,
        })
        .code(HTTP_CODES.OK);
    }
    return h.response({ token: null, errorMessage: 'Credentials are invalid' }).code(HTTP_CODES.UNAUTHORIZED);
  };
}
