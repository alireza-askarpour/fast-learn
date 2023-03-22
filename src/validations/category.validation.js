import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const createCategorySchema = Joi.object({
  name: Joi.string().required().error(createHttpError.BadRequest()),
  value: Joi.string().required().error(createHttpError.BadRequest()),
  disabled: Joi.string().error(createHttpError.BadRequest()),
  parent: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest()),
})

export const updateCategorySchema = Joi.object({
  name: Joi.string().error(createHttpError.BadRequest()),
  value: Joi.string().error(createHttpError.BadRequest()),
  disabled: Joi.string().error(createHttpError.BadRequest()),
  parent: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest()),
})
