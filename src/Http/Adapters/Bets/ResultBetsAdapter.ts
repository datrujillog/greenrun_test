import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import ResultBetsCommand from '../../../Application/Commands/Bets/ResultBetsCommand';
import { resultBetsSchema } from '../../../Http/Validators/Schemas/Bets/ResultBetsSchema';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class ResultBetsAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): ResultBetsCommand {
    const params = request.params;
    const body = request.payload;

    const error = this.validator.validate(
      {
        body: body,
        params: params,
      },
      resultBetsSchema,
    );

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new ResultBetsCommand(params.id, body['result']);
  }
}
