import * as Joi from 'joi';
import { BET_RESULT } from '../../../../Domain/Interfaces/BetResults';
export const resultBetsSchema = Joi.object({
  body: Joi.object({
    result: Joi.string().allow(BET_RESULT.WON, BET_RESULT.LOST).only().required(),
  }).required(),
  params: Joi.object({
    id: Joi.number().required(),
  }).required(),
});
export const resultBetsBodySchema = Joi.object({
  result: Joi.string().allow(BET_RESULT.WON, BET_RESULT.LOST).only().required(),
});
export const resultBetsParamsSchema = Joi.object({
  id: Joi.number().required(),
});
