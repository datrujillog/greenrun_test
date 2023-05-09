import * as Joi from 'joi';
import { BET_RESULT } from '../../../../Domain/Interfaces/BetResults';
import { BET_STATUSES } from '../../../../Domain/Interfaces/BetStatus';
export const getBetsSchema = Joi.object().keys({
  event_id: Joi.number().optional(),
  sport: Joi.string().alphanum().optional(),
});

export const getBetsResultSchema = Joi.object().keys({
  id: Joi.number(),
  bet_option: Joi.string().alphanum().required(),
  status: Joi.string().alphanum().allow(BET_STATUSES.ACTIVE, BET_STATUSES.CANCELLED, BET_STATUSES.SETTLED).required(),
  sport: Joi.string().alphanum().required(),
  name: Joi.string().alphanum().required(),
  event_id: Joi.number().required(),
  odd: Joi.number().required(),
  result: Joi.string().alphanum().allow(BET_RESULT.WON, BET_RESULT.LOST).only().required(),
});
