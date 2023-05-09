import * as Joi from 'joi';
import { USER_ROLES } from '../../../../Domain/Interfaces/UserRoles';
export const createUsersSchema = Joi.object({
  role: Joi.string().alphanum().allow(USER_ROLES.ADMIN, USER_ROLES.USER).only().required(),
  first_name: Joi.string().alphanum().required(),
  last_name: Joi.string().alphanum().required(),
  phone: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  address: Joi.string().alphanum().required(),
  gender: Joi.string().alphanum().required(),
  birth_date: Joi.string().alphanum().required(),
  country_id: Joi.number().required(),
  city: Joi.string().alphanum().required(),
  category: Joi.string().alphanum().required(),
  document_id: Joi.number().required(),
});

export const getUsersResultSchema = Joi.object({
  id: Joi.number(),
  role: Joi.string().alphanum().allow(USER_ROLES.ADMIN, USER_ROLES.USER).only().required(),
  first_name: Joi.string().alphanum().required(),
  last_name: Joi.string().alphanum().required(),
  phone: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().required(),
  password: Joi.string().alphanum().required(),
  address: Joi.string().alphanum().required(),
  gender: Joi.string().alphanum().required(),
  birth_date: Joi.string().alphanum().required(),
  country_id: Joi.number().required(),
  city: Joi.string().alphanum().required(),
  category: Joi.string().alphanum().required(),
  document_id: Joi.number().required(),
});
