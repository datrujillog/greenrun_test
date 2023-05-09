import * as Joi from 'joi';
import { BET_STATUSES } from '../../../../Domain/Interfaces/BetStatus';
export const updateBetsSchema = Joi.object({
  body: Joi.object({
    status: Joi.string().allow(BET_STATUSES.ACTIVE, BET_STATUSES.CANCELLED, BET_STATUSES.SETTLED).only().optional(),
    odd: Joi.number().optional(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
});
export const updateBetsSchemaBodyResult = Joi.object({
  status: Joi.string().allow(BET_STATUSES.ACTIVE, BET_STATUSES.CANCELLED, BET_STATUSES.SETTLED).only().optional(),
  odd: Joi.number().optional(),
});
export const updateBetsSchemaParamsResult = Joi.object({
  id: Joi.number().required(),
});
