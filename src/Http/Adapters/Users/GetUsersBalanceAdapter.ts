import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { getUsersSchema } from '../../../Http/Validators/Schemas/Users/GetUsersSchema';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import GetUsersBalanceQuery from '../../../Application/Commands/Users/GetUsersBalanceQuery';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class GetUsersBalanceAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): GetUsersBalanceQuery {
    const params = request.query;
    const error = this.validator.validate(params, getUsersSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new GetUsersBalanceQuery(params.user_id);
  }
}
