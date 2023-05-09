import * as Joi from 'joi';
export const placeBetsSchema = Joi.object({
  userId: Joi.number().required(),
  bets: Joi.array()
    .items(
      Joi.object({
        betId: Joi.number().required(),
        amount: Joi.number().required(),
      }),
    )
    .required(),
});
