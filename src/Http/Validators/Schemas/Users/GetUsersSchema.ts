import * as Joi from 'joi';
export const getUsersSchema = Joi.object({
  user_id: Joi.number().required(),
});
