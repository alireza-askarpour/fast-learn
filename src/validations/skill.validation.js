import Joi from 'joi'
import createHttpError from 'http-errors'

export const createSkillSchema = Joi.object({
  name: Joi.string().required().error(createHttpError.BadRequest('INVALID_NAME')),
  value: Joi.string().required().error(createHttpError.BadRequest('INVALID_VALUE')),
})

export const updateSkillSchema = Joi.object({
  name: Joi.string().error(createHttpError.BadRequest('INVALID_NAME')),
  value: Joi.string().error(createHttpError.BadRequest('INVALID_VALUE')),
})
