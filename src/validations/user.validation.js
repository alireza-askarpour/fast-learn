import Joi from 'joi'
import createHttpError from 'http-errors'

export const authSchema = Joi.object({
  email: Joi.string().email().required().error(createHttpError.Unauthorized('INVALID_EMAIL')),
  password: Joi.string().min(8).required().error(createHttpError.Unauthorized('INVALID_PASSWORD')),
})
