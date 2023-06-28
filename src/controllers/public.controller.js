import createHttpError from 'http-errors'

import CourseModel from '../models/course.models.js'
import { ObjectIdValidator } from '../validations/public.validation.js'
import { Messages } from '../constants/messages.js'

export const findCourseById = async courseId => {
  const { id } = await ObjectIdValidator.validateAsync({ id: courseId })
  const course = await CourseModel.findById(id)
  if (!course) throw createHttpError.NotFound(Messages.COURSE_NOT_FOUND)
  return course
}
