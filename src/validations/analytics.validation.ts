import Joi from 'joi';

export const dateRangeSchema = Joi.object({
  startDate: Joi.date().iso().required().messages({
    'any.required': `"startDate" is required`,
    'date.format': `"startDate" must be in ISO format (YYYY-MM-DD)`,
  }),
  endDate: Joi.date().iso().required().messages({
    'any.required': `"endDate" is required`,
    'date.format': `"endDate" must be in ISO format (YYYY-MM-DD)`,
  }),
});
