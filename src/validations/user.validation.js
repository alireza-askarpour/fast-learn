import Joi from 'joi'
import createHttpError from 'http-errors'

export const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest('The mobile number is not correct')),
})

export const checkOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.Unauthorized('The mobile number entered is not correct')),
  code: Joi.string()
    .length(6)
    .error(createHttpError.Unauthorized('The code sent is not correct')),
})
