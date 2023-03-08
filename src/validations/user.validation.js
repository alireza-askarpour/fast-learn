import Joi from 'joi'
import createHttpError from 'http-errors'

export const getOtpSchema = Joi.object({
  mobile: Joi.string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(createHttpError.BadRequest('The mobile number is not correct')),
})
