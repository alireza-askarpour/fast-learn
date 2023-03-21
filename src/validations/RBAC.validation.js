import Joi from 'joi'
import createHttpError from 'http-errors'

export const createPermissionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .error(createHttpError.BadRequest('The permission entered is not correct')),
  description: Joi.string()
    .min(0)
    .max(100)
    .required()
    .error(createHttpError.BadRequest('The description entered is not correct')),
})
