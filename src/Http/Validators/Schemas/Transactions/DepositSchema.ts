import * as Joi from 'joi';
export const depositSchema = Joi.object({
  user_id: Joi.number().required(),
  amount: Joi.number().required(),
});
