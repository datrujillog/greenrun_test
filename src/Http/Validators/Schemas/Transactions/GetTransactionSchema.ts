import * as Joi from 'joi';
import { TRANSACCIONS_CATEGORIES } from '../../../../Domain/Interfaces/TransactionCategories';
export const getTransactionSchema = Joi.object({
  user_id: Joi.number().required(),
  category: Joi.string()
    .alphanum()
    .allow(
      TRANSACCIONS_CATEGORIES.BET,
      TRANSACCIONS_CATEGORIES.DEPOSIT,
      TRANSACCIONS_CATEGORIES.WINNING,
      TRANSACCIONS_CATEGORIES.WITHDRAW,
    )
    .only()
    .required(),
});

export const getTransactionResultSchema = Joi.array().items({
  id: Joi.number(),
  user_id: Joi.number(),
  amount: Joi.number(),
  category: Joi.string().alphanum(),
  status: Joi.string().alphanum().allow().only(),
  user_bet_id: Joi.number(),
  created_at: Joi.string(),
  updated_at: Joi.string(),
  deleted: Joi.boolean(),
  deleted_at: Joi.string(),
});
