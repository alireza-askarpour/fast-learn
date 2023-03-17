import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const ObjectIdValidator = Joi.object({
  id: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest('The entered ID is not correct')),
})

export const SlugValidator = Joi.object({
  slug: Joi.string().error(createHttpError.BadRequest('The entered slug is not correct')),
})
