import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import BanUsersCommand from '../../../Application/Commands/Users/BanUsersCommand';
import { banUsersSchema } from '../../../Http/Validators/Schemas/Users/BanUsersSchema';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class BanUsersAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): BanUsersCommand {
    const params = request.params;
    const error = this.validator.validate(params, banUsersSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new BanUsersCommand(params.id);
  }
}
