import Joi from 'joi'
import createHttpError from 'http-errors'

export const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().error(createHttpError.BadRequest('The title entered is incorrect')),
  description: Joi.string().required().error(createHttpError.BadRequest('The type description is incorrect')),
  content: Joi.string().required().error(createHttpError.BadRequest('The type content is incorrect')),
  slug: Joi.string().required().error(createHttpError.BadRequest('The slug entered is incorrect')),
  tags: Joi.array().min(0).max(20).required().error(createHttpError.BadRequest('The tags entered is incorrect')),
  reading_time: Joi.string().required().error(createHttpError.BadRequest('The reading time entered is incorrect')),
})
