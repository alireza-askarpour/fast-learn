import Joi from 'joi'
import createHttpError from 'http-errors'

export const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(50).required().error(createHttpError.BadRequest('The title entered is incorrect')),
  description: Joi.string().required().error(createHttpError.BadRequest('The type description is incorrect')),
  content: Joi.string().required().error(createHttpError.BadRequest('The type content is incorrect')),
  slug: Joi.string().required().error(createHttpError.BadRequest('The slug entered is incorrect')),
  tags: Joi.array().min(0).max(20).required().error(createHttpError.BadRequest('The tags entered is incorrect')),
})

export const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(50).error(createHttpError.BadRequest('The title entered is incorrect')),
  description: Joi.string().error(createHttpError.BadRequest('The type description is incorrect')),
  content: Joi.string().error(createHttpError.BadRequest('The type content is incorrect')),
  slug: Joi.string().error(createHttpError.BadRequest('The slug entered is incorrect')),
  tags: Joi.array().min(0).max(20).error(createHttpError.BadRequest('The tags entered is incorrect')),
})
