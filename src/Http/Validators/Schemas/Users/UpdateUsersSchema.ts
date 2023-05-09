import * as Joi from 'joi';
export const adminUpdateUsersSchema = Joi.object({
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
  body: Joi.object({
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
  }).required(),
});

export const updateUsersSchema = Joi.object({
  body: Joi.object({
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
  }).required(),
});

export const updateUsersBodyResultSchema = Joi.object({
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

export const updateUsersParamsResultSchema = Joi.object({
  id: Joi.number().required(),
});
