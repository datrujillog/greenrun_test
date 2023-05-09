import * as Joi from 'joi';
export const loginUserSchema = Joi.object({
  username: Joi.string().alphanum().required(),
  password: Joi.string(),
});
