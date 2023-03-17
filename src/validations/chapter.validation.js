import Joi from 'joi'
import createHttpError from 'http-errors'

export const ChapterSchema = Joi.object({
  title: Joi.string().error(createHttpError.BadRequest('The entered title is not correct')),
  description: Joi.string().error(createHttpError.BadRequest('The entered description is not correct')),
})
