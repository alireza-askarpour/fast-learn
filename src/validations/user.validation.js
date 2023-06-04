import Joi from 'joi'
import createHttpError from 'http-errors'

export const loginSchema = Joi.object({
  email: Joi.string().email().required().error(createHttpError.Unauthorized('INVALID_EMAIL')),
  password: Joi.string().min(8).required().error(createHttpError.Unauthorized('INVALID_PASSWORD')),
})

export const signupSchema = Joi.object({
  fullname: Joi.string().required().error(createHttpError.Unauthorized('INVALID_FULLNAME')),
  email: Joi.string().email().required().error(createHttpError.Unauthorized('INVALID_EMAIL')),
  password: Joi.string().min(8).required().error(createHttpError.Unauthorized('INVALID_PASSWORD')),
})
