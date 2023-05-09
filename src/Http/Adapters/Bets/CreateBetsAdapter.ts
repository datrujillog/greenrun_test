import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import CreateBetsCommand from '../../../Application/Commands/Bets/CreateBetsCommand';
import { createBetsSchema } from '../../Validators/Schemas/Bets/CreateBetsSchema';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class CreateBetsAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): CreateBetsCommand {
    const body = request.payload;
    const error = this.validator.validate(body, createBetsSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new CreateBetsCommand(body['bet_option'], body['sport'], body['name'], body['event_id'], body['odd']);
  }
}
