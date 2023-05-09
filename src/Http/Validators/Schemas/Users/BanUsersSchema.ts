import * as Joi from 'joi';
export const banUsersSchema = Joi.object({
  id: Joi.number().required(),
});
