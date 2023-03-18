import Joi from 'joi'
import createHttpError from 'http-errors'

import { MONGO_ID_PATTERN } from '../constants/regex.constant.js'

export const createEpisodeSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().error(createHttpError.BadRequest('The title of the course is not correct')),
  description: Joi.string().required().error(createHttpError.BadRequest('The description sent is not correct')),
  type: Joi.string().pattern(/(lock|unlock)/i).required().error(createHttpError.BadRequest("The type entered is incorrect")),
  chapterId: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createHttpError.BadRequest('The chapterID is not correct')),
  courseId: Joi.string().pattern(MONGO_ID_PATTERN).required().error(createHttpError.BadRequest('The courseID is not correct')),
})
