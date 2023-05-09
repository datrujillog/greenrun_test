import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import CreateUsersCommand from '../../../Application/Commands/Users/CreateUsersCommand';
import bcrypt from 'bcrypt';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { createUsersSchema } from '../../../Http/Validators/Schemas/Users/CreateUsersSchema';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class CreateUsersAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): CreateUsersCommand {
    const body = request.payload;
    const error = this.validator.validate(body, createUsersSchema);

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new CreateUsersCommand(
      body['role'],
      body['first_name'],
      body['last_name'],
      body['phone'],
      body['email'],
      body['username'],
      bcrypt.hashSync(body['password'], Number(process.env.SALT_ROUNDS)),
      body['address'],
      body['gender'],
      body['birth_date'],
      body['country_id'],
      body['city'],
      body['category'],
      body['document_id'],
    );
  }
}
