import { Request } from '@hapi/hapi';
import Boom from '@hapi/boom';
import { inject, injectable } from 'inversify';
import { adminUpdateUsersSchema, updateUsersSchema } from '../../../Http/Validators/Schemas/Users/UpdateUsersSchema';
import ValidatorInterface from '../../../Http/Validators/ValidatorInterface';
import { INTERFACES } from '../../../Infrastructure/DI/Interfaces.types';
import UpdateUsersCommand from '../../../Application/Commands/Users/UpdateUsersCommand';
import { USER_ROLES } from '../../../Domain/Interfaces/UserRoles';
import { HTTP_CODES } from '../../../Http/Enums/HttpStatusCode';

@injectable()
export default class UpdateUsersAdapter {
  constructor(@inject(INTERFACES.ValidatorInterface) private validator: ValidatorInterface) {}

  public from(request: Request): UpdateUsersCommand {
    const body = request.payload;
    const params = request.params;

    let error = null;
    let userId = null;
    let fromAdmin = false;
    if (request['current_user'].role !== USER_ROLES.ADMIN) {
      error = this.validator.validate(
        {
          body: body,
          params: params,
        },
        updateUsersSchema,
      );
      userId = request['current_user'].id;
    } else {
      error = this.validator.validate(
        {
          body: body,
          params: params,
        },
        adminUpdateUsersSchema,
      );
      userId = params.id;
      fromAdmin = true;
    }

    if (error) {
      throw Boom.boomify(error, {
        statusCode: HTTP_CODES.UNPROCESSABLE_ENTITY,
        data: error.details[0].message,
      });
    }

    return new UpdateUsersCommand(
      fromAdmin,
      userId,
      body['first_name'],
      body['last_name'],
      body['phone'],
      body['email'],
      body['username'],
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
