import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const createCourseSchema = Joi.object({
  title: Joi.string().max(3).max(30).required().error(createHttpError.BadRequest('The title of the course is not correct')),
  description: Joi.string().required().error(createHttpError.BadRequest('The description sent is not correct')),
  slug: Joi.string().required().error(createHttpError.BadRequest("The entered slug is not correct")),
  tags: Joi.array().min(0).max(20).required().error(createHttpError.BadRequest('Tags cannot be more than 20 items')),
  category: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createHttpError.BadRequest('The category entered is incorrect')),
  price: Joi.number().required().error(createHttpError.BadRequest('The entered price is not correct')),
  discount: Joi.number().required().error(createHttpError.BadRequest('The entered discount is not correct')),
  type: Joi.string().pattern(/(free|paid|subscription)/i),
  level: Joi.string().required().error(createHttpError.BadRequest("The level sent is not correct"))
})

export const updateCourseSchema = Joi.object({
  title: Joi.string().max(3).max(30).error(createHttpError.BadRequest('The title of the course is not correct')),
  description: Joi.string().error(createHttpError.BadRequest('The description sent is not correct')),
  slug: Joi.string().error(createHttpError.BadRequest("The entered slug is not correct")),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest('Tags cannot be more than 20 items')),
  category: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest('The category entered is incorrect')),
  price: Joi.number().error(createHttpError.BadRequest('The entered price is not correct')),
  discount: Joi.number().error(createHttpError.BadRequest('The entered discount is not correct')),
  type: Joi.string().pattern(/(free|paid|subscription)/i).error(createHttpError.BadRequest("The entered type is not correct")),
  level: Joi.string().error(createHttpError.BadRequest("The level sent is not correct")),
  thumbnail: Joi.string().error(createHttpError.BadRequest("The entered thumbnail is not correct")),
  status: Joi.string().pattern(/(soon|holding|completed)/i).error(createHttpError.BadRequest("The entered status is not correct")),
})
