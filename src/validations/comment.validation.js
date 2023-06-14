import Joi from 'joi'
import createHttpError from 'http-errors'
import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const addPostCommentValidation = Joi.object({
  blog: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("INVALID_BLOG")),
  type: Joi.string().valid('course', 'blog').error(createHttpError.BadRequest("INVALID_TYPE")),
  content: Joi.string().required().error(createHttpError.BadRequest("INVALID_CONTENT")),
  reply: Joi.string().pattern(MONGO_ID_PATTERN).error(createHttpError.BadRequest("INVALID_REPLY")),
})
